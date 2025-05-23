import { useState, useEffect, useRef } from 'react';
import { Octokit } from 'octokit';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string | null;
  topics: string[];
  image_url?: string | null; // Nueva propiedad para la imagen
}

interface UseGitHubReposOptions {
  perPage?: number;
  initialPage?: number;
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
  visibility?: 'all' | 'public' | 'private';
}

export const useGitHubRepos = (options: UseGitHubReposOptions = {}) =>{
  const {
    perPage = 10,
    initialPage = 1,
    sort = 'updated',
    visibility = 'public',
  } = options;

  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchRepos = async (pageNum: number, resetRepos = false) => {
    try {
      setLoading(true);
      const octokit = new Octokit({
        auth: import.meta.env.VITE_GITHUB_KEY,
      });

      const response = await octokit.request("GET /user/repos", {
        sort,
        per_page: perPage,
        page: pageNum,
        visibility,
      });

      if (response.data.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const reposWithTopics = await Promise.all(
        response.data.map(async (repo) => {
          const topicsResponse = await octokit.request(
            "GET /repos/{owner}/{repo}/topics",
            {
              owner: repo.owner.login,
              repo: repo.name,
              headers: {
                "X-GitHub-Api-Version": "2022-11-28",
              },
            },
          );

          // Buscar imagen en la raíz del repo
          const imageCandidates = [
            "logo.png", "banner.png", "preview.png", "cover.png", "screenshot.png"
          ];
          let image_url: string | null = null;
          for (const img of imageCandidates) {
            try {
              // Verifica si el archivo existe usando la API de contenidos
              await octokit.request(
                "GET /repos/{owner}/{repo}/contents/{path}",
                {
                  owner: repo.owner.login,
                  repo: repo.name,
                  path: img,
                }
              );
              image_url = `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/main/${img}`;
              break;
            } catch (e) {
              // Si no existe, sigue buscando
            }
          }

          return {
            ...repo,
            topics: topicsResponse.data.names,
            description: repo.description ?? "",
            image_url,
          };
        }),
      );

      setRepos((prevRepos) => {
        if (resetRepos) {
          return reposWithTopics;
        }
        
        const allRepos = [...prevRepos, ...reposWithTopics];
        const uniqueRepos = allRepos.filter(
          (repo, index, self) =>
            self.findIndex((r) => r.id === repo.id) === index,
        );
        return uniqueRepos;
      });
    } catch (err) {
      setError("Failed to fetch GitHub repositories");
      console.error("Error fetching repos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial
  useEffect(() => {
    fetchRepos(initialPage, true);
  }, []);

  // Configuración del IntersectionObserver para scroll infinito
  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    observer.current = new IntersectionObserver(handleObserver);

    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loading, hasMore]);

  // Cargar más repositorios cuando cambia la página
  useEffect(() => {
    if (page > initialPage) {
      fetchRepos(page);
    }
  }, [page]);

  // Obtener lenguajes únicos de los repositorios
  const languages = [...new Set(repos.map((repo) => repo.language).filter(Boolean))];

  // Filtrar repositorios por lenguaje
  const filteredRepos = selectedLanguage
    ? repos.filter((repo) => repo.language === selectedLanguage)
    : repos;

  // Cambiar el filtro de lenguaje
  const changeLanguageFilter = (language: string) => {
    setSelectedLanguage(language);
  };

  // Resetear la búsqueda con nuevos parámetros
  const resetAndSearch = () => {
    setPage(initialPage);
    setRepos([]);
    setHasMore(true);
    fetchRepos(initialPage, true);
  };

  return {
    repos: filteredRepos,
    loading,
    error,
    page,
    hasMore,
    loadMoreRef,
    languages,
    selectedLanguage,
    setSelectedLanguage: changeLanguageFilter,
    resetAndSearch,
    isFirstPageLoading: loading && page === initialPage
  };
}