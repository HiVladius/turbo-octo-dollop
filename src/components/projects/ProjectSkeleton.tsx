interface ProjectSkeletonProps {
  showImage?: boolean;
  variant?: 'default' | 'compact';
}

export const ProjectSkeleton = ({ showImage = true, variant = 'default' }: ProjectSkeletonProps) => {
  const isCompact = variant === 'compact';
  
  return (
    <div className="bg-zinc-900/50 rounded-xl overflow-hidden shadow-xl flex flex-col h-full relative min-h-[280px] sm:min-h-[320px]">
      {/* Efecto shimmer */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="p-4 sm:p-6 flex-1">
        {/* Skeleton para la imagen del proyecto */}
        {showImage && (
          <div className="mb-3 sm:mb-4 flex justify-center">
            <div className={`w-full bg-zinc-800 rounded-lg relative overflow-hidden ${isCompact ? 'h-16 sm:h-20' : 'h-24 sm:h-32'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-pulse" />
            </div>
          </div>
        )}
        
        {/* Skeleton para el header (título y enlace) */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className={`bg-zinc-800 rounded relative overflow-hidden ${isCompact ? 'h-4 sm:h-5 w-1/2' : 'h-5 sm:h-6 w-2/3'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-pulse" />
          </div>
          <div className="h-4 w-4 sm:h-5 sm:w-5 bg-zinc-800 rounded relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-pulse" />
          </div>
        </div>
        
        {/* Skeleton para la descripción */}
        <div className="mb-3 sm:mb-4 space-y-2">
          <div className="h-3 sm:h-4 bg-zinc-800 rounded w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-pulse" />
          </div>
          {!isCompact && (
            <div className="h-3 sm:h-4 bg-zinc-800 rounded w-3/4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-pulse" />
            </div>
          )}
        </div>
        
        {/* Skeleton para los topics/tags */}
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
          {Array.from({ length: isCompact ? 2 : 3 }).map((_, i) => (
            <div key={i} className={`h-5 sm:h-6 bg-zinc-800 rounded-full relative overflow-hidden ${i === 0 ? 'w-12 sm:w-16' : i === 1 ? 'w-16 sm:w-20' : 'w-10 sm:w-14'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-pulse" />
            </div>
          ))}
        </div>
        
        {/* Skeleton para el lenguaje principal */}
        <div className="mb-3 sm:mb-4 mt-auto">
          <div className="h-3 sm:h-4 bg-zinc-800 rounded w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-pulse" />
          </div>
        </div>
      </div>
      
      {/* Skeleton para el footer */}
      <div className="border-t border-zinc-800 p-3 sm:p-4 bg-black/20">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 sm:h-4 sm:w-4 bg-zinc-800 rounded relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-pulse" />
              </div>
              <div className="h-3 w-4 sm:h-4 sm:w-6 bg-zinc-800 rounded relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-pulse" />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 sm:h-4 sm:w-4 bg-zinc-800 rounded relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-pulse" />
              </div>
              <div className="h-3 w-4 sm:h-4 sm:w-6 bg-zinc-800 rounded relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-pulse" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 sm:h-4 sm:w-4 bg-zinc-800 rounded relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-pulse" />
            </div>
            <div className="h-3 w-16 sm:h-4 sm:w-20 bg-zinc-800 rounded relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
