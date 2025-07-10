import { useState, useEffect, useRef } from 'react';
import { Code } from 'lucide-react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Animación de entrada con GSAP
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Inicializar elementos ocultos
    gsap.set([contentRef.current, progressRef.current], {
      opacity: 0,
      y: 50,
      scale: 0.8
    });

    // Animación de entrada
    tl.to(contentRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "back.out(1.7)"
    })
    .to(progressRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, []);

  // Animación de progreso con GSAP
   useEffect(() => {
    const progressObj = { value: 0 };
    
    const tl = gsap.timeline();
    tl.to(progressObj, {
      value: 100,
      duration: 3,
      ease: "power2.out",
      onUpdate: () => {
        setProgress(Math.round(progressObj.value));
      },
      onComplete: () => {
        setIsComplete(true);
        // Animar el texto para indicar que puede hacer click
        const textElement = contentRef.current?.querySelector('p');
        if (textElement) {
          gsap.to(textElement, {
            opacity: 1,
            scale: 1.05,
            duration: 0.5,
            ease: "power2.out",
            yoyo: true,
            repeat: -1
          });
        }
      }
    });

    return () => {
      tl.kill();
    };
  }, []);


  // Configurar canvas y partículas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Partículas
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      color: string;
    }> = [];

    // Crear partículas
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        vz: Math.random() * 5 + 1,
        color: `hsl(${Math.random() * 60 + 320}, 70%, 60%)` // Colores rojizos/rosados
      });
    }

    let animationId: number;
    const animate = () => {
      if (!isAnimating) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Actualizar posición
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z -= particle.vz;

        // Resetear partícula si sale de pantalla
        if (particle.z <= 0) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.z = 1000;
        }

        // Proyección 3D
        const perspective = 500;
        const projectedX = (particle.x - canvas.width / 2) * (perspective / particle.z) + canvas.width / 2;
        const projectedY = (particle.y - canvas.height / 2) * (perspective / particle.z) + canvas.height / 2;
        const size = (1 - particle.z / 1000) * 3;

        // Dibujar partícula
        ctx.beginPath();
        ctx.arc(projectedX, projectedY, size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Líneas entre partículas cercanas
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const dz = particle.z - otherParticle.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance < 100) {
              const otherProjectedX = (otherParticle.x - canvas.width / 2) * (perspective / otherParticle.z) + canvas.width / 2;
              const otherProjectedY = (otherParticle.y - canvas.height / 2) * (perspective / otherParticle.z) + canvas.height / 2;
              
              ctx.beginPath();
              ctx.moveTo(projectedX, projectedY);
              ctx.lineTo(otherProjectedX, otherProjectedY);
              ctx.strokeStyle = `rgba(220, 20, 60, ${0.3 * (1 - distance / 100)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isAnimating]);

  const handleClick = () => {

    if(!isComplete) return;

    setIsAnimating(false);
    
    // Animación de salida con GSAP
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
      }
    });

    tl.to(contentRef.current, {
      opacity: 0,
      y: -30,
      scale: 0.9,
      duration: 0.5,
      ease: "power2.in"
    })
    .to(progressRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.8,
      duration: 0.4,
      ease: "power2.in"
    }, "-=0.3")
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    }, "-=0.2");
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center cursor-pointer z-50"
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      <div ref={contentRef} className="relative z-10 flex flex-col items-center">
        <Code size={64} className="text-red-600 animate-pulse mb-8" />
        
        <div className="text-white text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Cargando Portfolio</h2>
          <p className="text-gray-400">Haz click para continuar</p>
        </div>
      </div>

      <div ref={progressRef} className="relative z-10 flex flex-col items-center">
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-red-600 to-pink-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mt-2 text-red-400 font-mono text-sm">
          {progress}%
        </div>
      </div>
    </div>
  );
}