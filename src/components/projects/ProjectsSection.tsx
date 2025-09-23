import { Clock, ExternalLink, GitFork, Star } from "lucide-react";
import { LoadingSpinner } from './LoadingSpinner';
import { ProjectSkeleton } from './ProjectSkeleton';
import { timeAgo } from "../../helpers/timeAgo";
import { useGitHubStore, useAppStore } from "../../store";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export const ProjectsSection = () => {
  const { t } = useTranslation();
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
      <main className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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
      </main>
    );
  }
  
  if (error) {
    return (
      <main className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col items-center justify-center">
        <h1 className="text-xl sm:text-2xl font-bold text-red-500 mb-4">{t("projects-section.error-loading")}</h1>
        <p className="text-gray-400 text-center text-sm sm:text-base" role="alert">{error}</p>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header>
        <h1
          id="projects-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 lg:mb-12 animate-fade-in flex items-center gap-2
            bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400
            bg-clip-text text-transparent"
          style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          {t("projects-section.title")}
        </h1>
        <p className="text-sm sm:text-base mb-4 sm:mb-6 lg:mb-7">
          {t("projects-section.description")}
        </p>
      </header>

      <section aria-labelledby="projects-heading">
        {/* Filtro de lenguaje */}
        <div className="mb-6 sm:mb-8">
          <label
            htmlFor="language-filter"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            {t("projects-section.filter-label")}
          </label>
          <select
            id="language-filter"
            name="language"
            className="mt-1 block w-full max-w-xs pl-3 pr-10 py-2 text-sm sm:text-base border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 rounded-md bg-black text-white transition-colors"
            value={selectedLanguage}
            onChange={(e) => handleLanguageChange(e.target.value)}
            aria-describedby="language-help"
          >
            <option value="">{t("projects-section.all-languages")}</option>
            {languages.map(
              (language) => (
                <option key={language} value={language || ""}>
                  {language}
                </option>
              ),
            )}
          </select>
          <div id="language-help" className="sr-only">
            {t("projects-section.filter-help")}
          </div>
        </div>

        {/* Status region para cambios dinámicos */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {loading ? t("projects-section.loading-more") : t("projects-section.showing-projects", { count: repos.length })}
        </div>

        {/* Grid de proyectos */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          role="list"
          aria-label={t("projects-section.projects-list")}
        >        {loading && repos.length === 0
          ? Array.from({ length: 8 }).map((_, idx) => (
              <ProjectSkeleton 
                key={idx} 
                showImage={idx % 3 !== 0} // Variación más predecible: cada 3er elemento sin imagen
                variant={idx % 5 === 0 ? 'compact' : 'default'} // Cada 5to elemento compact
              />
            ))
          : repos.map((repo) => (
          <article
            key={repo.id}
            className="bg-zinc-900/50 rounded-xl overflow-hidden shadow-xl hover:shadow-red-500/20 transition-all duration-300 flex flex-col h-full focus-within:ring-2 focus-within:ring-red-500"
            role="listitem"
            aria-labelledby={`project-title-${repo.id}`}
            aria-describedby={`project-description-${repo.id}`}
          >
            <div className="p-4 sm:p-6 flex-1 flex flex-col">
              {/* Imagen del repositorio si existe */}
              {repo.image_url && (
                <div className="mb-3 sm:mb-4 flex justify-center">
                  <img
                    src={repo.image_url}
                    alt={`Screenshot del proyecto ${repo.name}`}
                    className="rounded-lg shadow-md max-h-24 sm:max-h-32 object-contain bg-black"
                    style={{ maxWidth: '100%' }}
                    loading="lazy"
                  />
                </div>
              )}
              
              <header className="flex items-start justify-between mb-3 sm:mb-4">
                <h2 
                  id={`project-title-${repo.id}`}
                  className="text-lg sm:text-xl font-bold line-clamp-2 flex-1 mr-2"
                >
                  {repo.name}
                </h2>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-900 rounded p-1"
                  aria-label={`Ver proyecto ${repo.name} en GitHub (abre en nueva pestaña)`}
                >
                  <ExternalLink size={18} className="sm:w-5 sm:h-5" aria-hidden="true" />
                </a>
              </header>
              
              <p 
                id={`project-description-${repo.id}`}
                className="text-gray-400 mb-3 sm:mb-4 line-clamp-3 text-sm sm:text-base flex-1"
              >
                {repo.description || t("projects-section.no-description")}
              </p>

              {/* Topics/Tags */}
              {repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4" role="list" aria-label={t("projects-section.project-technologies")}>
                  {repo.topics.slice(0, 3).map((topic: string) => (
                    <span
                      key={`${repo.id}-${topic}`}
                      role="listitem"
                      className="px-2 sm:px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-xs sm:text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                  {repo.topics.length > 3 && (
                    <span 
                      role="listitem"
                      className="px-2 sm:px-3 py-1 bg-gray-500/10 text-gray-400 rounded-full text-xs sm:text-sm"
                      aria-label={t("projects-section.more-technologies", { count: repo.topics.length - 3 })}
                    >
                      +{repo.topics.length - 3}
                    </span>
                  )}
                </div>
              )}

              {repo.language && (
                <div className="mb-3 sm:mb-4 mt-auto">
                  <span className="text-xs sm:text-sm font-medium text-gray-400">
                    {t("projects-section.main-language")}{"  "}
                    <span className="text-white">{repo.language}</span>
                  </span>
                </div>
              )}
            </div>

            <footer className="border-t border-zinc-800 p-3 sm:p-4 bg-black/20">
              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400">
                <div className="flex items-center gap-2 sm:gap-4" aria-label="Project statistics">
                  <div className="flex items-center gap-1" title={`${repo.stargazers_count} stars`}>
                    <Star size={14} className="sm:w-4 sm:h-4" aria-hidden="true" />
                    <span aria-label={`${repo.stargazers_count} stars`}>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1" title={`${repo.forks_count} forks`}>
                    <GitFork size={14} className="sm:w-4 sm:h-4" aria-hidden="true" />
                    <span aria-label={`${repo.forks_count} forks`}>{repo.forks_count}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} className="sm:w-4 sm:h-4" aria-hidden="true" />
                  <time 
                    dateTime={repo.updated_at || undefined}
                    className="hidden sm:inline"
                    title={repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : undefined}
                  >
                    {repo.updated_at
                      ? `Updated ${timeAgo(repo.updated_at)}`
                      : "No updates"}
                  </time>
                  <time 
                    dateTime={repo.updated_at || undefined}
                    className="sm:hidden"
                    title={repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : undefined}
                  >
                    {repo.updated_at
                      ? timeAgo(repo.updated_at)
                      : "No updates"}
                  </time>
                </div>
              </div>
            </footer>
          </article>
        ))}
        </div>
        
        {loading && <LoadingSpinner />}
        <div ref={loadMoreRef} className="h-10"></div>
      </section>
    </main>
  );
};