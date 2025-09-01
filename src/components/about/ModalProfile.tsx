import { X } from 'lucide-react';
import { OptimizedImage } from '../common/OptimizedImage';
import { useEffect, useRef } from 'react';

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
    const modalRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);
    
    // Focus trap elements
    const focusableElementsSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    useEffect(() => {
        if (isOpen) {
            // Store the element that was focused before opening the modal
            previousFocusRef.current = document.activeElement as HTMLElement;
            
            // Focus the close button when modal opens
            setTimeout(() => {
                closeButtonRef.current?.focus();
            }, 100);
        } else {
            // Restore focus to the element that opened the modal
            if (previousFocusRef.current) {
                previousFocusRef.current.focus();
            }
        }
    }, [isOpen]);

    // Handle escape key press and focus trap
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isOpen || !modalRef.current) return;

            if (event.key === 'Escape') {
                event.preventDefault();
                event.stopPropagation();
                onClose();
                return;
            }

            // Focus trap: handle Tab and Shift+Tab
            if (event.key === 'Tab') {
                const focusableElements = modalRef.current.querySelectorAll(focusableElementsSelector);
                const firstFocusable = focusableElements[0] as HTMLElement;
                const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

                if (event.shiftKey) {
                    // Shift + Tab: if focus is on first element, move to last
                    if (document.activeElement === firstFocusable) {
                        event.preventDefault();
                        lastFocusable?.focus();
                    }
                } else {
                    // Tab: if focus is on last element, move to first
                    if (document.activeElement === lastFocusable) {
                        event.preventDefault();
                        firstFocusable?.focus();
                    }
                }
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
            // Add aria-hidden to main content
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.setAttribute('aria-hidden', 'true');
            }
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
            // Remove aria-hidden from main content
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.removeAttribute('aria-hidden');
            }
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
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <div 
                ref={modalRef}
                className="bg-zinc-900/90 backdrop-blur-md max-w-xs sm:max-w-lg lg:max-w-2xl xl:max-w-4xl w-full rounded-xl p-4 sm:p-6 lg:p-8 relative shadow-xl animate-slide-up max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    ref={closeButtonRef}
                    onClick={handleCloseClick}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/60 hover:text-white transition-colors hover:rotate-90 duration-200 z-10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-900 rounded-full p-1"
                    aria-label={`Cerrar modal de ${title}`}
                    type="button"
                >
                    <X size={20} className="sm:w-6 sm:h-6" aria-hidden="true" />
                </button>
                
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                    <OptimizedImage 
                        src={image} 
                        alt={`Foto de perfil de ${title}`}
                        responsive={true}
                        aspectRatio="square"
                        className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-lg shadow-xl ring-2 ring-white/10 mx-auto lg:mx-0 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                        <h1 
                            id="modal-title"
                            className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-white/90 text-center lg:text-left"
                        >
                            {title}
                        </h1>
                        <div id="modal-description" className="space-y-3 sm:space-y-4 text-white/80">
                            {firstLine && (
                                <p className="leading-relaxed text-sm sm:text-base">
                                    {firstLine}
                                </p>
                            )}
                            {secondLine && (
                                <p className="leading-relaxed text-sm sm:text-base">
                                    {secondLine}
                                </p>
                            )}
                            {thirdLine && (
                                <p className="leading-relaxed text-sm sm:text-base">
                                    {thirdLine}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}