import { useState, useEffect } from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    responsive?: boolean;
    aspectRatio?: 'square' | '16/9' | '4/3' | '3/2' | 'auto';
}

export function OptimizedImage({ 
    src, 
    alt, 
    className = '', 
    width, 
    height, 
    responsive = true,
    aspectRatio = 'auto'
}: OptimizedImageProps) {
    const [imageSrc, setImageSrc] = useState<string>(src);
    const [isLoading, setIsLoading] = useState(true);

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
                alt={alt}
                loading="lazy"
                width={width}
                height={height}
                className={`
                    w-full h-full object-cover transition-opacity duration-300
                    ${isLoading ? 'opacity-0' : 'opacity-100'}
                    ${responsive ? 'max-w-full h-auto' : ''}
                `}
                onLoad={() => setIsLoading(false)}
            />
            {isLoading && (
                <div className="absolute inset-0 bg-gray-900 animate-pulse rounded" />
            )}
        </div>
    );
} 