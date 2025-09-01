import { useState, useEffect } from 'react';
import { Octokit } from 'octokit';

interface GitHubEvent {
  id: string;
  type: string | null;
  created_at: string | null;
  repo: {
    name: string;
  };
  payload: any;
}

interface ContributionDay {
  date: string;
  level: number; // 0-4 (sin actividad a máxima actividad)
  count: number;
  skill?: string;
}

export const useGitHubActivity = () => {
  const [contributionData, setContributionData] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGitHubActivity = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const octokit = new Octokit({
        auth: import.meta.env.VITE_GITHUB_KEY,
      });

      // Verificar si tenemos una clave de API válida
      if (!import.meta.env.VITE_GITHUB_KEY) {
        throw new Error('VITE_GITHUB_KEY no está configurada');
      }

      // Obtener el usuario autenticado
      const userResponse = await octokit.request('GET /user');
      const username = userResponse.data.login;

      // Obtener eventos de actividad del usuario (últimos 300 eventos)
      const eventsResponse = await octokit.request('GET /users/{username}/events', {
        username,
        per_page: 100, // Reducir para evitar rate limiting
      });

      // Obtener repositorios del usuario
      const reposResponse = await octokit.request('GET /user/repos', {
        sort: 'updated',
        per_page: 50, // Reducir número de repos
        visibility: 'public',
      });

      // Procesar commits de cada repositorio para los últimos 365 días
      const today = new Date();
      const startDate = new Date();
      startDate.setDate(today.getDate() - 365);

      const contributionMap = new Map<string, { count: number; repos: Set<string> }>();

      // Inicializar todos los días con 0 contribuciones
      for (let i = 0; i < 365; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        contributionMap.set(dateStr, { count: 0, repos: new Set() });
      }

      // Procesar eventos de actividad
      eventsResponse.data.forEach((event: GitHubEvent) => {
        if (!event.created_at || !event.type) return; // Skip eventos sin fecha o tipo
        
        const eventDate = new Date(event.created_at);
        if (eventDate >= startDate && eventDate <= today) {
          const dateStr = eventDate.toISOString().split('T')[0];
          const existing = contributionMap.get(dateStr) || { count: 0, repos: new Set() };
          
          // Contar diferentes tipos de eventos como contribuciones
          if (['PushEvent', 'CreateEvent', 'PullRequestEvent', 'IssuesEvent'].includes(event.type)) {
            existing.count += 1;
            existing.repos.add(event.repo.name);
            contributionMap.set(dateStr, existing);
          }
        }
      });

      // Para repositorios propios, obtener commits adicionales
      const commitPromises = reposResponse.data
        .filter(repo => !repo.fork && !repo.archived) // Solo repos no forkeados y no archivados
        .slice(0, 10) // Reducir a 10 repos para evitar rate limiting
        .map(async (repo) => {
        try {
          // Verificar si el repo tiene commits antes de hacer la consulta
          const branchResponse = await octokit.request('GET /repos/{owner}/{repo}/branches', {
            owner: repo.owner.login,
            repo: repo.name,
            per_page: 1,
          });

          if (branchResponse.data.length === 0) {
            return []; // Repo sin ramas
          }

          const commitsResponse = await octokit.request('GET /repos/{owner}/{repo}/commits', {
            owner: repo.owner.login,
            repo: repo.name,
            author: username,
            since: startDate.toISOString(),
            until: today.toISOString(),
            per_page: 50, // Reducir número de commits por repo
          });

          return commitsResponse.data.map((commit: any) => ({
            date: commit.commit.author.date,
            repo: repo.name,
            message: commit.commit.message,
          }));
        } catch (error: any) {
          // Manejo específico de diferentes tipos de errores
          if (error.status === 409) {
            console.warn(`Repositorio ${repo.name} está vacío o tiene conflictos`);
          } else if (error.status === 403) {
            console.warn(`Rate limit alcanzado para ${repo.name}`);
          } else {
            console.warn(`No se pudieron obtener commits para ${repo.name}:`, error.message);
          }
          return [];
        }
      });

      const allCommits = (await Promise.all(commitPromises)).flat();

      // Procesar commits
      allCommits.forEach((commit) => {
        const commitDate = new Date(commit.date);
        const dateStr = commitDate.toISOString().split('T')[0];
        const existing = contributionMap.get(dateStr) || { count: 0, repos: new Set() };
        existing.count += 1;
        existing.repos.add(commit.repo);
        contributionMap.set(dateStr, existing);
      });

      // Convertir a formato de contribuciones
      const contributions: ContributionDay[] = [];
      for (let i = 0; i < 365; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        const dayData = contributionMap.get(dateStr) || { count: 0, repos: new Set() };
        
        // Calcular nivel basado en la cantidad de contribuciones
        let level = 0;
        if (dayData.count > 0) {
          if (dayData.count >= 10) level = 4;
          else if (dayData.count >= 6) level = 3;
          else if (dayData.count >= 3) level = 2;
          else level = 1;
        }

        contributions.push({
          date: dateStr,
          level,
          count: dayData.count,
          skill: dayData.repos.size > 0 ? `${dayData.repos.size} repos` : undefined,
        });
      }

      setContributionData(contributions);
      setError(null);

    } catch (err) {
      console.error('Error fetching GitHub activity:', err);
      setError('No se pudo cargar la actividad de GitHub');
      
      // Fallback a datos simulados si hay error
      generateFallbackData();
    } finally {
      setLoading(false);
    }
  };

  const generateFallbackData = () => {
    const contributions: ContributionDay[] = [];
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 365);

    for (let i = 0; i < 365; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const dayOfWeek = currentDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      let count = 0;
      let level = 0;
      
      // Simular actividad más baja en fines de semana
      const baseChance = isWeekend ? 0.3 : 0.7;
      if (Math.random() < baseChance) {
        count = Math.floor(Math.random() * 8) + 1;
        if (count >= 6) level = 4;
        else if (count >= 4) level = 3;
        else if (count >= 2) level = 2;
        else level = 1;
      }

      contributions.push({
        date: currentDate.toISOString().split('T')[0],
        level,
        count,
        skill: count > 0 ? 'Simulado' : undefined,
      });
    }

    setContributionData(contributions);
  };

  useEffect(() => {
    fetchGitHubActivity();
  }, []);

  return {
    contributionData,
    loading,
    error,
    refetch: fetchGitHubActivity,
  };
};
