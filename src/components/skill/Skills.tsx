import { t } from "i18next";

import {SkillCard, skillsData} from './SkillCard'


export const Skills = () => {
  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 lg:mb-12 animate-fade-in flex items-center gap-2
          bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400
          bg-clip-text text-transparent"
        style={{
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {/* Nombre de titulo*/}
        {t("skill-section.skills")}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {skillsData.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  );
};


