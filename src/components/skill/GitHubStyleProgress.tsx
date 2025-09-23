import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGitHubActivity } from '../../hooks/useGitHubActivity';

interface ContributionDay {
  date: string;
  level: number; // 0-4 (sin actividad a máxima actividad)
  count: number;
  skill?: string;
}

interface GitHubStyleProgressProps {
  title?: string;
  className?: string;
}

export const GitHubStyleProgress: React.FC<GitHubStyleProgressProps> = ({ 
  title,
  className = "" 
}) => {
  const { t } = useTranslation();
  const { contributionData, loading, error } = useGitHubActivity();

  // Organizar datos en semanas para la visualización
  const getWeeksData = () => {
    if (!contributionData || contributionData.length === 0) return [];
    
    const weeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];
    
    // Encontrar el primer domingo para alinear correctamente
    const firstDate = new Date(contributionData[0]?.date || new Date());
    const dayOfWeek = firstDate.getDay();
    
    // Agregar días vacíos al inicio si es necesario
    for (let i = 0; i < dayOfWeek; i++) {
      currentWeek.push({
        date: '',
        level: 0,
        count: 0
      });
    }
    
    contributionData.forEach((day) => {
      currentWeek.push(day);
      
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    });
    
    // Agregar la última semana si no está completa
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({
          date: '',
          level: 0,
          count: 0
        });
      }
      weeks.push(currentWeek);
    }
    
    return weeks;
  };

  // Loading state
  if (loading) {
    return (
      <div className={`bg-gray-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50 w-full max-w-3xl mx-auto ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded mb-4 w-2/3"></div>
          <div className="h-32 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || contributionData.length === 0) {
    return (
      <div className={`bg-gray-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50 w-full max-w-3xl mx-auto ${className}`}>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-2">
            {title || t("github-progress.coding-activity")}
          </h3>
          <p className="text-red-400 text-sm">
            {error || t("github-progress.no-data", "No se pudieron cargar los datos de GitHub")}
          </p>
        </div>
      </div>
    );
  }

  const weeks = getWeeksData();
  const totalContributions = contributionData.reduce((sum: number, day: ContributionDay) => sum + day.count, 0);

  // Obtener color basado en el nivel
  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-gray-800/50';
      case 1: return 'bg-red-900/60';
      case 2: return 'bg-red-700/70';
      case 3: return 'bg-red-500/80';
      case 4: return 'bg-red-400';
      default: return 'bg-gray-800/50';
    }
  };

  const getLevelText = (level: number) => {
    switch (level) {
      case 0: return t("github-progress.no-activity", "Sin actividad");
      case 1: return t("github-progress.low-activity", "Baja actividad");
      case 2: return t("github-progress.medium-activity", "Actividad media");
      case 3: return t("github-progress.high-activity", "Alta actividad");
      case 4: return t("github-progress.very-high-activity", "Muy alta actividad");
      default: return t("github-progress.no-activity", "Sin actividad");
    }
  };

  const months = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ];

  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className={`bg-gray-900/40 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50 w-full max-w-3xl mx-auto ${className}`}>
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">
          {title || t("github-progress.coding-activity", "Actividad de Codificación")}
        </h3>
        <p className="text-sm text-gray-400">
          {t("github-progress.total-contributions", `${totalContributions} contribuciones`, { count: totalContributions })} {t("github-progress.in-last-year", "en el último año")}
        </p>
      </div>

      {/* Gráfico de contribuciones */}
      <div className="overflow-x-auto">
        <div className="min-w-[650px] max-w-full mx-auto">
          {/* Etiquetas de meses */}
          <div className="flex mb-2 pl-8">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="flex-1 text-xs text-gray-500 text-left">
                {i % 3 === 0 ? months[i] : ''}
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            {/* Etiquetas de días */}
            <div className="flex flex-col justify-between mr-2 text-xs text-gray-500">
              {days.map((day, index) => (
                <div key={day} className="h-3 flex items-center">
                  {index % 2 === 1 ? day : ''}
                </div>
              ))}
            </div>

            {/* Grid de contribuciones */}
            <div className="flex gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`
                        w-3 h-3 rounded-sm border border-gray-700/30 transition-all duration-200 hover:scale-110
                        ${day.date ? getLevelColor(day.level) : 'bg-transparent'}
                        ${day.count > 0 ? 'hover:ring-1 hover:ring-red-400/50' : ''}
                      `}
                      title={
                        day.date && day.count > 0
                          ? `${day.count} contribuciones en ${day.date}${day.skill ? ` - ${day.skill}` : ''}`
                          : day.date
                          ? `Sin actividad en ${day.date}`
                          : ''
                      }
                      role={day.date ? "button" : undefined}
                      tabIndex={day.date && day.count > 0 ? 0 : -1}
                      aria-label={
                        day.date && day.count > 0
                          ? `${day.count} contribuciones en ${day.date}. ${getLevelText(day.level)}`
                          : undefined
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
        <span>{t("github-progress.less", "Menos")}</span>
        <div className="flex items-center gap-1 mx-2">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-3 h-3 rounded-sm ${getLevelColor(level)} border border-gray-700/30`}
              title={getLevelText(level)}
            />
          ))}
        </div>
        <span>{t("github-progress.more", "Más")}</span>
      </div>

      {/* Indicador de datos reales */}
      <div className="mt-3 text-center">
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-900/30 text-green-400 border border-green-700/50">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
          {t("github-progress.real-data", "Datos reales de GitHub")}
        </span>
      </div>
    </div>
  );
};
