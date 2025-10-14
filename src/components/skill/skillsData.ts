import icons from "./icons/index";

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
export const skillLevels = {
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
