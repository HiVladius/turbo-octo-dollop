import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    responsive?: boolean;
    aspectRatio?: 'square' | '16/9' | '4/3' | '3/2' | 'auto';
    // Nuevas props para accesibilidad
    decorative?: boolean;
    longDescription?: string;
    priority?: boolean;
    context?: 'profile' | 'project' | 'skill' | 'hero' | 'decorative';
    sizes?: string;
}

export function OptimizedImage({ 
    src, 
    alt, 
    className = '', 
    width, 
    height, 
    responsive = true,
    aspectRatio = 'auto',
    decorative = false,
    longDescription,
    priority = false,
    context = 'decorative',
    sizes
}: OptimizedImageProps) {
    const { t } = useTranslation();
    const [imageSrc, setImageSrc] = useState<string>(src);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // Función para generar alt text inteligente
    const getSmartAltText = (): string => {
        if (decorative) return "";
        
        switch (context) {
            case 'profile':
                return `Foto de perfil: ${alt}`;
            case 'project':
                return `Captura del proyecto: ${alt}`;
            case 'skill':
                return `Icono de habilidad: ${alt}`;
            case 'hero':
                return `Imagen principal: ${alt}`;
            default:
                return alt;
        }
    };

    // ID único para descripciones largas
    const descriptionId = longDescription ? `img-desc-${Math.random().toString(36).substr(2, 9)}` : undefined;

    const getAspectRatioClass = () => {
        switch (aspectRatio) {
            case 'square': return 'aspect-square';
            case '16/9': return 'aspect-video';
            case '4/3': return 'aspect-[4/3]';
            case '3/2': return 'aspect-[3/2]';
            default: return '';
        }
    };

    const containerStyle = responsive ? {} : { width, height };

    useEffect(() => {
        // Intentar cargar la versión WebP si el navegador la soporta
        const checkWebPSupport = async () => {
            try {
                setIsLoading(true);
                setHasError(false);
                
                // Crear una imagen WebP temporal
                const webPTest = new Image();
                webPTest.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
                
                await new Promise((resolve, reject) => {
                    webPTest.onload = resolve;
                    webPTest.onerror = reject;
                });

                // Si llegamos aquí, WebP es soportado
                // Convertir la ruta de la imagen a WebP
                const webPSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
                
                // Intentar cargar la versión WebP
                const webPImage = new Image();
                webPImage.src = webPSrc;
                
                await new Promise((resolve, reject) => {
                    webPImage.onload = resolve;
                    webPImage.onerror = reject;
                });

                setImageSrc(webPSrc);
            } catch (error) {
                // Si hay algún error, mantener la imagen original
                console.log('WebP no soportado o imagen no disponible, usando formato original');
                setImageSrc(src);
            }
        };

        checkWebPSupport();
    }, [src]);    return (
        <div 
            className={`relative ${getAspectRatioClass()} ${className}`} 
            style={containerStyle}
        >
            <img
                src={imageSrc}
                alt={getSmartAltText()}
                loading={priority ? "eager" : "lazy"}
                width={width}
                height={height}
                sizes={sizes}
                fetchPriority={priority ? "high" : "auto"}
                aria-busy={isLoading}
                aria-describedby={descriptionId}
                className={`
                    w-full h-full object-cover transition-opacity duration-300
                    ${isLoading ? 'opacity-0' : 'opacity-100'}
                    ${responsive ? 'max-w-full h-auto' : ''}
                `}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setHasError(true);
                    setIsLoading(false);
                }}
            />
            
            {/* Placeholder de carga accesible */}
            {isLoading && (
                <div 
                    className="absolute inset-0 bg-gray-900 animate-pulse rounded"
                    aria-hidden="true"
                    role="img"
                    aria-label="Cargando imagen..."
                />
            )}
            
            {/* Mensaje de error accesible */}
            {hasError && (
                <div 
                    className="absolute inset-0 bg-gray-800 rounded flex items-center justify-center text-gray-400 text-sm"
                    role="img"
                    aria-label={t("common.image-load-error")}
                >
                    <span>{t("common.image-load-error")}</span>
                </div>
            )}
            
            {/* Descripción larga oculta */}
            {longDescription && (
                <div id={descriptionId} className="sr-only">
                    {longDescription}
                </div>
            )}
        </div>
    );
} 