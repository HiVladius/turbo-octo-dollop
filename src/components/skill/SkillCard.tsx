import React, { useEffect, useRef, useState } from "react";
import icons from "./icons/index";
import gsap from "gsap";
import { useTranslation } from "react-i18next";

const {
    astro,
    css,
    deno,
    githubflow,
    js,
    node,
    postgress,
    react,
    tailwind,
    ts,
    vite,
    mongodb,
    rust,
    cloude,
    vue,
} = icons;

// Definición de niveles de habilidad
const skillLevels = {
    iniciado: { percentage: 20, label: "skill-section.level-beginner" },
    intermedio: { percentage: 50, label: "skill-section.level-intermediate" },
    avanzado: { percentage: 80, label: "skill-section.level-advanced" },
    senior: { percentage: 100, label: "skill-section.level-senior" },
};

// Datos de las habilidades
export const skillsData = [
    { name: "Astro", icon: astro, level: skillLevels.intermedio },
    { name: "CSS", icon: css, level: skillLevels.avanzado },
    { name: "GitHub Flow", icon: githubflow, level: skillLevels.intermedio },
    { name: "Deno", icon: deno, level: skillLevels.intermedio },
    { name: "JavaScript", icon: js, level: skillLevels.avanzado },
    { name: "TypeScript", icon: ts, level: skillLevels.avanzado },
    { name: "Node.js", icon: node, level: skillLevels.avanzado },
    { name: "PostgreSQL", icon: postgress, level: skillLevels.intermedio },
    { name: "MongoDB", icon: mongodb, level: skillLevels.intermedio },
    { name: "React", icon: react, level: skillLevels.avanzado },
    { name: "Tailwind CSS", icon: tailwind, level: skillLevels.avanzado },
    { name: "Vite", icon: vite, level: skillLevels.intermedio },
    { name: "Rust", icon: rust, level: skillLevels.intermedio },
    { name: "Google Cloud", icon: cloude, level: skillLevels.intermedio },
    { name: "Vue.js", icon: vue, level: skillLevels.intermedio },
];

interface SkillCardProps {
    skill: (typeof skillsData)[number];
    index: number;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => {
    const { t } = useTranslation();
    const [isFlipped, setIsFlipped] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleCardClick();
        }
    };

    useEffect(() => {
        if (cardRef.current && progressBarRef.current) {
            if (isFlipped) {
                gsap.to(cardRef.current, {
                    rotationY: 180,
                    duration: 0.6,
                    ease: "power2.inOut",
                });
                // Animar la barra de progreso para que se llene
                gsap.fromTo(
                    progressBarRef.current,
                    { width: "0%" }, // Estado inicial de la animación (desde 0%)
                    {
                        width: `${skill.level.percentage}%`, // Estado final (porcentaje de la habilidad)
                        duration: 0.5, // Duración de la animación de llenado
                        delay: 0.3, // Retraso para que comience después de que la tarjeta empiece a girar
                        ease: "power1.inOut",
                    },
                );
            } else {
                gsap.to(cardRef.current, {
                    rotationY: 0,
                    duration: 0.6,
                    ease: "power2.inOut",
                });
                // Resetear la barra de progreso cuando se voltea de nuevo a la cara frontal
                gsap.set(progressBarRef.current, { width: "0%" });
            }
        }
    }, [isFlipped, skill.level.percentage]); // isFlipped es la dependencia principal

    return (
        <button
            ref={buttonRef}
            className="w-full h-40 perspective focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black rounded-lg transition-all"
            onClick={handleCardClick}
            onKeyDown={handleKeyDown}
            aria-label={`${skill.name} - ${isFlipped ? t("skill-section.level-info", { level: t(skill.level.label), percentage: skill.level.percentage }) : t("skill-section.press-for-details")}`}
            aria-expanded={isFlipped}
            aria-describedby={`skill-description-${index}`}
            role="listitem"
        >
            <div
                ref={cardRef}
                className="relative w-full h-full preserve-3d transform-style-preserve-3d"
            >
                {/* Cara frontal */}
                <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-4 bg-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 rounded-lg shadow-2xl shadow-red-500/10 hover:shadow-red-500/20 hover:bg-zinc-700/90 hover:border-red-500/30 transition-all duration-300">
                    <img
                        src={skill.icon}
                        alt=""
                        className="w-16 h-16 mb-2"
                        aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-center">
                        {skill.name}
                    </span>
                </div>
                
                {/* Cara trasera */}
                <div className="absolute w-full h-full backface-hidden transform rotate-y-180 flex flex-col items-center justify-center p-4 bg-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 rounded-lg shadow-2xl shadow-pink-500/10">
                    <span className="text-sm font-semibold mb-2">{skill.name}</span>
                    <div 
                        className="w-full bg-zinc-700/80 rounded-full h-4 mb-1"
                        role="progressbar"
                        aria-valuenow={skill.level.percentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={t("skill-section.experience-level", { percentage: skill.level.percentage })}
                    >
                        <div
                            ref={progressBarRef}
                            className="bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400 h-4 rounded-full transition-all duration-500 shadow-lg shadow-red-500/20"
                            style={{ width: `${isFlipped ? skill.level.percentage : 0}%` }}
                        />
                    </div>
                    <span className="text-xs">
                        {t(skill.level.label)} ({skill.level.percentage}%)
                    </span>
                </div>
            </div>
            
            {/* Descripción oculta para screen readers */}
            <span id={`skill-description-${index}`} className="sr-only">
                {t("skill-section.technology-description", { name: skill.name, level: t(skill.level.label), percentage: skill.level.percentage })}
                {isFlipped ? ' Información detallada mostrada.' : ' Presiona para ver más detalles.'}
            </span>
        </button>
    );
};
