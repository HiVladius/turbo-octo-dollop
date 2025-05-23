import { X } from 'lucide-react';
import { OptimizedImage } from '../common/OptimizedImage';
import { useEffect } from 'react';

interface ModalProfileProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    firstLine?: React.ReactNode;
    secondLine?: React.ReactNode;
    thirdLine?: React.ReactNode;
    image: string;
}

export function ModalProfile({ isOpen, onClose, title, firstLine, secondLine, thirdLine, image }: ModalProfileProps) {
    
    // Handle escape key press
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                event.preventDefault();
                event.stopPropagation();
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            e.preventDefault();
            e.stopPropagation();
            onClose();
        }
    };

    const handleCloseClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onClose();
    };    return (
        <div 
            className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={handleBackdropClick}
        >
            <div 
                className="bg-zinc-900/90 backdrop-blur-md max-w-xs sm:max-w-lg lg:max-w-2xl xl:max-w-4xl w-full rounded-xl p-4 sm:p-6 lg:p-8 relative shadow-xl animate-slide-up max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={handleCloseClick}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/60 hover:text-white transition-colors hover:rotate-90 duration-200 z-10"
                    aria-label="Cerrar modal"
                >
                    <X size={20} className="sm:w-6 sm:h-6" />
                </button>
                
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                    <OptimizedImage 
                        src={image} 
                        alt={title} 
                        responsive={true}
                        aspectRatio="square"
                        className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-lg shadow-xl ring-2 ring-white/10 mx-auto lg:mx-0 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-white/90 text-center lg:text-left">{title}</h2>
                        <div className="space-y-3 sm:space-y-4 text-white/80">
                            <div className="leading-relaxed text-sm sm:text-base">
                                {firstLine}
                            </div>
                            <div className="leading-relaxed text-sm sm:text-base">
                                {secondLine}
                            </div>
                            <div className="leading-relaxed text-sm sm:text-base">
                                {thirdLine}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}