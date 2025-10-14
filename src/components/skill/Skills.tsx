import { t } from "i18next";
import { useEffect } from "react";
import { useAppStore } from "../../store";
import { SkillCard } from './SkillCard';
import { skillsData } from './skillsData';
import { GitHubStyleProgress } from './GitHubStyleProgress';

export const Skills = () => {
  // App store
  const setCurrentSection = useAppStore((state) => state.setCurrentSection);
  
  useEffect(() => {
    setCurrentSection('about');
  }, [setCurrentSection]);

  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header>
        <h1
          id="skills-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 lg:mb-12 animate-fade-in flex items-center gap-2
            bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400
            bg-clip-text text-transparent"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("skill-section.skills")}
        </h1>
        <p className="text-gray-400 text-sm sm:text-base mb-6">
          {t("skill-section.details")}
        </p>
      </header>
      
            
      <section aria-labelledby="skills-heading">
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          role="list"
          aria-label={t("skill-section.skills-list-label")}
        >
          {skillsData.map((skill, index) => (
            <SkillCard 
              key={skill.name} 
              skill={skill} 
              index={index}
            />
          ))}
        </div>
      </section>

      {/* GitHub Style Progress Chart */}
      <section className="mt-8 max-w-4xl mx-auto" aria-labelledby="coding-activity-heading">
        <GitHubStyleProgress />
      </section>

    </main>
  );
};


