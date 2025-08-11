import { BookOpenCheck, Code, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { JSX, useCallback, useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

import logo from "../src/assets/logo2-removebg.png";
import { useAppStore, useLanguageStore } from "./store";
import "./styles/gsap-effects.css";

interface ProfileOption {
  id: string;
  title: string;
  icon: JSX.Element;
}

export function ProfileSelector() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLanguage = useLanguageStore((state) => state.currentLanguage);
  const toggleLanguage = useLanguageStore((state) => state.toggleLanguage);
  const initializeLanguage = useLanguageStore((state) =>
    state.initializeLanguage
  );
  const setCurrentSection = useAppStore((state) => state.setCurrentSection);

  // Variables para tracking del mouse
  const mouseRef = useRef({
    oldX: 0,
    oldY: 0,
    deltaX: 0,
    deltaY: 0,
  });

  const profiles: ProfileOption[] = useMemo(() => [
    {
      id: "about",
      title: t("profile-selection.sobre-mi"),
      icon: <User size={32} />,
    },
    {
      id: "projects",
      title: t("profile-selection.proyectos"),
      icon: <Code size={32} />,
    },
    {
      id: "Skills",
      title: t("profile-selection.habilidades"),
      icon: <BookOpenCheck size={32} />,
    },
    {
      id: "contact",
      title: t("profile-selection.contacto"),
      icon: <Mail size={32} />,
    },
  ], [t]);

  useEffect(() => {
    initializeLanguage();
    setCurrentSection("home");
  }, [initializeLanguage, setCurrentSection]);

  // Efecto GSAP para mouse tracking y animaciones
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Variables globales para mouse tracking
    let oldX = 0;
    let oldY = 0;
    let deltaX = 0;
    let deltaY = 0;

    // Mouse move handler para calcular deltas - CORREGIDO
    const handleMouseMove = (e: MouseEvent) => {
      deltaX = e.clientX - oldX;
      deltaY = e.clientY - oldY;
      oldX = e.clientX;
      oldY = e.clientY;

      // Actualizar ref para acceso en otros handlers
      mouseRef.current = { oldX, oldY, deltaX, deltaY };
    };

    // Agregar listener al documento para capturar todo el movimiento
    document.addEventListener("mousemove", handleMouseMove);

    // Setup de animaciones para cada card
    const cards = container.querySelectorAll(".profile-card");
    const eventHandlers: Map<
      HTMLElement,
      { enter: () => void; leave: () => void }
    > = new Map();

    cards.forEach((card) => {
      const cardElement = card as HTMLElement;
      const iconContainer = cardElement.querySelector(
        ".icon-container",
      ) as HTMLElement;

      if (!iconContainer) return;

      // Mouse enter handler con GSAP - MEJORADO
      const handleMouseEnter = () => {
        // Usar valores actuales del mouse
        let currentDeltaX = deltaX;
        let currentDeltaY = deltaY;

        // Limitar el rango de movimiento para evitar que se salga del contenedor
        const maxMovement = 30; // máximo 30px de movimiento
        currentDeltaX = Math.max(
          -maxMovement,
          Math.min(maxMovement, currentDeltaX * 8),
        );
        currentDeltaY = Math.max(
          -maxMovement,
          Math.min(maxMovement, currentDeltaY * 8),
        );

        // Crear timeline con cleanup automático
        const tl = gsap.timeline({
          onComplete: () => {
            tl.kill();
          },
        });

        tl.timeScale(1.2);

        // Efecto de inercia simulado - usando animate instead of inertia plugin
        tl.to(iconContainer, {
          duration: 0.6,
          x: currentDeltaX, // Usar valores limitados
          y: currentDeltaY, // Usar valores limitados
          ease: "power2.out",
        })
          .to(iconContainer, {
            duration: 0.8,
            x: 0,
            y: 0,
            ease: "elastic.out(1, 0.3)",
          });

        // Rotación aleatoria simultánea
        tl.fromTo(iconContainer, {
          rotate: 0,
          scale: 1,
        }, {
          duration: 0.8,
          rotate: (Math.random() - 0.5) * 30, // -15 a 15 grados
          scale: 1.1,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        }, 0); // Iniciar al tiempo 0 (junto con la primera animación)

        // Efectos adicionales
        gsap.set(cardElement, { zIndex: 10 });

        // Agregar clase para indicar animación
        cardElement.classList.add("animating");
      };

      // Mouse leave handler - MEJORADO
      const handleMouseLeave = () => {
        // Matar cualquier animación existente
        gsap.killTweensOf(iconContainer);

        // Animación de retorno
        gsap.to(iconContainer, {
          duration: 0.5,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          ease: "power2.out",
        });

        gsap.set(cardElement, { zIndex: 1 });

        // Quitar clase de animación
        cardElement.classList.remove("animating");
      };

      // Guardar referencias para cleanup
      eventHandlers.set(cardElement, {
        enter: handleMouseEnter,
        leave: handleMouseLeave,
      });

      // Agregar event listeners
      cardElement.addEventListener("mouseenter", handleMouseEnter);
      cardElement.addEventListener("mouseleave", handleMouseLeave);

      // Inicializar posición
      gsap.set(iconContainer, { x: 0, y: 0, rotate: 0, scale: 1 });
    });

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const iconContainer = cardElement.querySelector(
          ".icon-container",
        ) as HTMLElement;
        const handlers = eventHandlers.get(cardElement);

        if (iconContainer) {
          gsap.killTweensOf(iconContainer);
        }

        if (handlers) {
          cardElement.removeEventListener("mouseenter", handlers.enter);
          cardElement.removeEventListener("mouseleave", handlers.leave);
        }
      });
    };
  }, []);

  const handleNavigate = useCallback((profileId: string) => {
    setCurrentSection(profileId as any);
    navigate(`/${profileId}`);
  }, [navigate, setCurrentSection]);

  const logoVariants = useMemo(() => ({
    animate: { scale: 1.1 },
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  }), []);

  return (
    <>
      <div
        ref={containerRef}
        className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
      >
        <motion.div
          className="img"
          {...logoVariants}
        >
          <img
            src={logo}
            alt="Logo"
            className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mb-6 sm:mb-8"
          />
        </motion.div>

        <h1
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-10 lg:mb-12 animate-fade-in flex items-center gap-2 text-center
    bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400
    bg-clip-text text-transparent"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("profile-selection.quien-esta-viendo-ahora")}
        </h1>

        {/* Grid container mejorado para el efecto GSAP - DENTRO DE UN SOLO RECUADRO */}
        <div className="main-container relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-lg border border-gray-600/50 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl max-w-6xl w-full overflow-hidden">
          {/* Efecto de brillo de fondo */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-pink-500/5 to-yellow-400/5 rounded-3xl" />

          {/* Grid de opciones */}
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="profile-card group relative cursor-pointer transition-all duration-300 will-change-transform"
                onClick={() => handleNavigate(profile.id)}
                style={{ zIndex: 1 }}
              >
                {/* Card container simplificado - SIN RECUADRO INDIVIDUAL */}
                <div className="card-inner flex flex-col items-center p-4 sm:p-6 rounded-xl hover:bg-gray-800/30 transition-all duration-300 min-h-[180px] sm:min-h-[200px] relative overflow-hidden">
                  {/* Background gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                  {/* Icon container - este será el elemento animado */}
                  <div className="icon-container relative z-10 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl bg-gradient-to-br from-gray-700/50 to-gray-800/50 flex items-center justify-center mb-3 sm:mb-4 border border-gray-600/30 group-hover:border-red-500/50 transition-all duration-300 will-change-transform backdrop-blur-sm">
                    <div className="scale-90 sm:scale-100 text-gray-300 group-hover:text-red-400 transition-colors duration-300">
                      {profile.icon}
                    </div>
                  </div>

                  {/* Título */}
                  <span className="relative z-10 text-gray-400 group-hover:text-white text-sm sm:text-base lg:text-lg font-medium text-center transition-colors duration-300 leading-tight">
                    {profile.title}
                  </span>

                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out rounded-xl" />
                </div>
              </div>
            ))}
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-red-500/30 rounded-full">
          </div>
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-pink-500/30 rounded-full">
          </div>
          <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-yellow-400/20 rounded-full">
          </div>
        </div>
      </div>

      {/* Language toggle mejorado */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <label className="relative inline-flex items-center cursor-pointer bg-black/90 backdrop-blur-md rounded-full px-4 py-3 border border-gray-600/50 hover:border-red-500/50 transition-all duration-300 touch-manipulation shadow-lg">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={currentLanguage === "en"}
            onChange={toggleLanguage}
          />
          <div className="w-12 h-6 sm:w-14 sm:h-7 bg-gray-700 rounded-full peer-checked:bg-gradient-to-r peer-checked:from-red-500 peer-checked:to-pink-500 
        peer-focus:outline-none peer-focus:ring-0
        after:content-[''] after:absolute after:top-[14px] after:left-[18px]
        after:bg-white after:border-gray-600 after:border after:rounded-full 
        after:h-5 after:w-5 sm:after:h-6 sm:after:w-6 after:transition-all duration-300 peer-checked:after:translate-x-5 sm:peer-checked:after:translate-x-6 after:shadow-md" />
          <span className="ml-4 text-sm sm:text-base font-medium  select-none bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400
bg-clip-text text-transparent text-center">
            ES / EN
          </span>
        </label>
      </motion.div>
    </>
  );
}
