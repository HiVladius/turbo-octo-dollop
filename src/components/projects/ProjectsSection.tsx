import { Clock, ExternalLink, GitFork, Star } from "lucide-react";
import { LoadingSpinner } from './LoadingSpinner';
import { ProjectSkeleton } from './ProjectSkeleton';
import { timeAgo } from "../../helpers/timeAgo";
import { useGitHubStore, useAppStore } from "../../store";
import { useEffect, useRef } from "react";

export const ProjectsSection = () => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  
  // GitHub store
  const repos = useGitHubStore((state) => state.filteredRepos);
  const loading = useGitHubStore((state) => state.loading);
  const error = useGitHubStore((state) => state.error);
  const hasMore = useGitHubStore((state) => state.hasMore);
  const languages = useGitHubStore((state) => state.languages);
  const selectedLanguage = useGitHubStore((state) => state.selectedLanguage);
  const setLanguageFilter = useGitHubStore((state) => state.setLanguageFilter);
  const loadMore = useGitHubStore((state) => state.loadMore);
  const fetchRepos = useGitHubStore((state) => state.fetchRepos);
  const isInitialized = useGitHubStore((state) => state.isInitialized);
  
  // App store
  const setCurrentSection = useAppStore((state) => state.setCurrentSection);
  
  useEffect(() => {
    setCurrentSection('projects');
  }, [setCurrentSection]);
  
  // Initialize repos if not already done
  useEffect(() => {
    if (!isInitialized) {
      fetchRepos(1, true);
    }
  }, [isInitialized, fetchRepos]);
  
  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loading, hasMore, loadMore]);

  const handleLanguageChange = (language: string) => {
    setLanguageFilter(language);
  };

  const isFirstPageLoading = loading && repos.length === 0;  if (isFirstPageLoading) {
    return (
      <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Skeleton para el título */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <div className="h-8 sm:h-10 w-60 sm:w-80 bg-zinc-800 rounded animate-pulse" />
        </div>
        
        {/* Skeleton para el texto descriptivo */}
        <div className="mb-4 sm:mb-6 lg:mb-7">
          <div className="h-4 sm:h-5 w-32 sm:w-48 bg-zinc-800 rounded animate-pulse" />
        </div>
        
        {/* Skeleton para el filtro */}
        <div className="mb-4 sm:mb-6">
          <div className="h-4 w-24 sm:w-32 bg-zinc-800 rounded animate-pulse mb-2" />
          <div className="h-8 sm:h-10 w-full max-w-xs bg-zinc-800 rounded animate-pulse" />
        </div>
          {/* Grid de skeleton projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {Array.from({ length: 8 }).map((_, idx) => (
            <ProjectSkeleton 
              key={idx} 
              showImage={Math.random() > 0.3} // 70% de probabilidad de mostrar imagen
              variant={Math.random() > 0.7 ? 'compact' : 'default'} // 30% compact, 70% default
            />
          ))}
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col items-center justify-center">
        <h2 className="text-xl sm:text-2xl font-bold text-red-500 mb-4">Error</h2>
        <p className="text-gray-400 text-center text-sm sm:text-base">{error}</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 lg:mb-12 animate-fade-in flex items-center gap-2
          bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400
          bg-clip-text text-transparent"
        style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      >
        My GitHub Projects
      </h1>
      <div className="mb-4 sm:mb-6 lg:mb-7">
        <p className="text-sm sm:text-base">Only show the public works</p>
      </div>
      <div className="mb-4 sm:mb-6">
        <label
          htmlFor="language"
          className="block text-sm font-medium text-gray-400 mb-2"
        >
          Filter by Language
        </label>
        <select
          id="language"
          name="language"
          className="mt-1 block w-full max-w-xs pl-3 pr-10 py-2 text-sm sm:text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md bg-black text-white"          value={selectedLanguage}
          onChange={(e) => handleLanguageChange(e.target.value)}
        >
          <option value="">All Languages</option>
          {languages.map(
            (language) => (
              <option key={language} value={language || ""}>
                {language}
              </option>
            ),
          )}
        </select>
      </div>      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">        {loading && repos.length === 0
          ? Array.from({ length: 8 }).map((_, idx) => (
              <ProjectSkeleton 
                key={idx} 
                showImage={idx % 3 !== 0} // Variación más predecible: cada 3er elemento sin imagen
                variant={idx % 5 === 0 ? 'compact' : 'default'} // Cada 5to elemento compact
              />
            ))
          : repos.map((repo) => (
          <div
            key={repo.id}
            className="bg-zinc-900/50 rounded-xl overflow-hidden shadow-xl hover:shadow-red-500/20 transition-all duration-300 flex flex-col h-full"
          >
            <div className="p-4 sm:p-6 flex-1 flex flex-col">
              {/* Imagen del repositorio si existe */}
              {repo.image_url && (
                <div className="mb-3 sm:mb-4 flex justify-center">
                  <img
                    src={repo.image_url}
                    alt={`Imagen de ${repo.name}`}
                    className="rounded-lg shadow-md max-h-24 sm:max-h-32 object-contain bg-black"
                    style={{ maxWidth: '100%' }}
                    loading="lazy"
                  />
                </div>
              )}
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl font-bold line-clamp-2 flex-1 mr-2">{repo.name}</h3>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                >
                  <ExternalLink size={18} className="sm:w-5 sm:h-5" />
                </a>
              </div>
              <p className="text-gray-400 mb-3 sm:mb-4 line-clamp-3 text-sm sm:text-base flex-1">
                {repo.description || "No description available"}
              </p>              <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                {repo.topics.slice(0, 3).map((topic: string) => (
                  <span
                    key={`${repo.id}-${topic}`}
                    className="px-2 sm:px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-xs sm:text-sm"
                  >
                    {topic}
                  </span>
                ))}
                {repo.topics.length > 3 && (
                  <span className="px-2 sm:px-3 py-1 bg-gray-500/10 text-gray-400 rounded-full text-xs sm:text-sm">
                    +{repo.topics.length - 3}
                  </span>
                )}
              </div>

              {repo.language && (
                <div className="mb-3 sm:mb-4 mt-auto">
                  <span className="text-xs sm:text-sm font-medium text-gray-400">
                    Main language:{"  "}
                    <span className="text-white">{repo.language}</span>
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-zinc-800 p-3 sm:p-4 bg-black/20">
              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400">
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="sm:w-4 sm:h-4" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork size={14} className="sm:w-4 sm:h-4" />
                    <span>{repo.forks_count}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">
                    {repo.updated_at
                      ? `Updated ${timeAgo(repo.updated_at)}`
                      : "No updates"}
                  </span>
                  <span className="sm:hidden">
                    {repo.updated_at
                      ? timeAgo(repo.updated_at)
                      : "No updates"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {loading ? <LoadingSpinner /> : null}
      <div ref={loadMoreRef} className="h-10"></div>
    </div>
  );
};