import React, { useEffect, useRef, useState } from "react";
import icons from "./icons/index";
import gsap from "gsap";

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
} = icons;

// Definición de niveles de habilidad
const skillLevels = {
    iniciado: { percentage: 20, label: "Iniciado" },
    intermedio: { percentage: 50, label: "Intermedio" },
    avanzado: { percentage: 80, label: "Avanzado" },
    senior: { percentage: 100, label: "Senior" },
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
    { name: "Rust", icon: rust, level: skillLevels.iniciado },
    { name: "Google Cloud", icon: cloude, level: skillLevels.intermedio },
];

interface SkillCardProps {
    skill: (typeof skillsData)[number];
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null); // Nueva referencia para la barra de progreso

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
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
        <div
            className="w-full h-40 perspective cursor-pointer"
            onClick={handleCardClick}
        >
            <div
                ref={cardRef}
                className="relative w-full h-full preserve-3d transform-style-preserve-3d"
            >
                {/* Cara frontal */}
                <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-4 bg-gray-700 rounded-lg shadow-lg">
                    <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-16 h-16 mb-2"
                    />
                    <p className="text-sm font-medium text-center">
                        {skill.name}
                    </p>
                </div>
                {/* Cara trasera */}
                <div className="absolute w-full h-full backface-hidden transform rotate-y-180 flex flex-col items-center justify-center p-4 bg-gray-700 rounded-lg shadow-lg">
                    <p className="text-sm font-semibold mb-2">{skill.name}</p>
                    <div className="w-full bg-gray-600 rounded-full h-4 mb-1">
                        <div
                            ref={progressBarRef} // Añadir la referencia
                            className="bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400 h-4 rounded-full"
                            style={{ width: `${skill.level.percentage}%` }} // Eliminar el estilo en línea
                        >
                        </div>
                    </div>
                    <p className="text-xs">
                        {skill.level.label} ({skill.level.percentage}%)
                    </p>
                </div>
            </div>
        </div>
    );
};
