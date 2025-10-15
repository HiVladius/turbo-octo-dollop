import { create } from 'zustand';
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
  image_url?: string | null;
}

interface GitHubState {
  repos: GitHubRepo[];
  filteredRepos: GitHubRepo[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  selectedLanguage: string;
  languages: string[];
  isInitialized: boolean;
  
  //* Actions
  fetchRepos: (pageNum?: number, resetRepos?: boolean) => Promise<void>;
  setLanguageFilter: (language: string) => void;
  resetAndSearch: () => void;
  loadMore: () => Promise<void>;
  clearError: () => void;
  
  //* Computed
  updateFilteredRepos: () => void;
}

const GITHUB_CONFIG = {
  perPage: 10,
  sort: 'updated' as const,
  visibility: 'public' as const,
  username: 'HiVladius' // Tu usuario de GitHub
};

export const useGitHubStore = create<GitHubState>((set, get) => ({
  repos: [],
  filteredRepos: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  selectedLanguage: '',
  languages: [],
  isInitialized: false,
  
  fetchRepos: async (pageNum = 1, resetRepos = false) => {
    const state = get();
    
    if (state.loading) return;
    
    set({ loading: true, error: null });
    
    try {
      // No se necesita autenticación para repos públicos
      const octokit = new Octokit();

      const response = await octokit.request("GET /users/{username}/repos", {
        username: GITHUB_CONFIG.username,
        sort: GITHUB_CONFIG.sort,
        per_page: GITHUB_CONFIG.perPage,
        page: pageNum,
        type: 'owner', // Repos del usuario
      });

      if (response.data.length === 0) {
        set({ hasMore: false, loading: false });
        return;
      }

      const reposWithTopics: GitHubRepo[] = await Promise.all(
        response.data.map(async (repo) => {
          try {
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

            return {
              id: repo.id,
              name: repo.name,
              description: repo.description ?? "",
              html_url: repo.html_url,
              stargazers_count: repo.stargazers_count ?? 0,
              forks_count: repo.forks_count ?? 0,
              language: repo.language ?? null,
              updated_at: repo.updated_at ?? null,
              topics: topicsResponse.data.names,
              image_url: null,
            };
          } catch (error) {
            console.error(`Error fetching data for repo ${repo.name}:`, error);
            return {
              id: repo.id,
              name: repo.name,
              description: repo.description ?? "",
              html_url: repo.html_url,
              stargazers_count: repo.stargazers_count ?? 0,
              forks_count: repo.forks_count ?? 0,
              language: repo.language ?? null,
              updated_at: repo.updated_at ?? null,
              topics: [],
              image_url: null,
            };
          }
        }),
      );

      set((state) => {
        const newRepos = resetRepos 
          ? reposWithTopics 
          : [...state.repos, ...reposWithTopics];
        
        // Remover duplicados
        const uniqueRepos = newRepos.filter(
          (repo, index, self) =>
            self.findIndex((r) => r.id === repo.id) === index,
        );
        
        // Actualizar lenguajes únicos (solo strings, sin null)
        const allLanguages = [
          ...new Set(
            uniqueRepos
              .map((repo) => repo.language)
              .filter((lang): lang is string => Boolean(lang))
          )
        ];
        
        return {
          repos: uniqueRepos,
          languages: allLanguages,
          page: pageNum,
          isInitialized: true
        };
      });
      
      get().updateFilteredRepos();
      
    } catch (err) {
      console.error("Error fetching GitHub repositories:", err);
      set({ error: "Error al cargar los repositorios de GitHub" });
    } finally {
      set({ loading: false });
    }
  },
  
  setLanguageFilter: (language) => {
    set({ selectedLanguage: language });
    get().updateFilteredRepos();
  },
  
  resetAndSearch: () => {
    set({ 
      page: 1, 
      repos: [], 
      hasMore: true, 
      error: null,
      selectedLanguage: '',
      isInitialized: false 
    });
    get().fetchRepos(1, true);
  },
  
  loadMore: async () => {
    const state = get();
    if (!state.hasMore || state.loading) return;
    
    await get().fetchRepos(state.page + 1);
  },
  
  clearError: () => set({ error: null }),
  
  updateFilteredRepos: () => {
    const { repos, selectedLanguage } = get();
    const filtered = selectedLanguage
      ? repos.filter((repo) => repo.language === selectedLanguage)
      : repos;
    
    set({ filteredRepos: filtered });
  }
}));

// Añadir declaración de tipo para import.meta.env si no existe ya en tu proyecto
declare global {
  interface ImportMetaEnv {
    VITE_GITHUB_KEY: string;
    // agrega aquí otras variables si las usas
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
