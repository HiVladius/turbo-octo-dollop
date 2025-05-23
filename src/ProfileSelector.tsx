import { Code, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../src/assets/logo2-removebg.png";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useAppStore, useLanguageStore } from "./store";

interface ProfileOption {
  id: string;
  title: string;
  icon: JSX.Element;
}

export function ProfileSelector() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const currentLanguage = useLanguageStore((state) => state.currentLanguage);
  const toggleLanguage = useLanguageStore((state) => state.toggleLanguage);
  const initializeLanguage = useLanguageStore((state) =>
    state.initializeLanguage
  );

  const setCurrentSection = useAppStore((state) => state.setCurrentSection);

  const profiles: ProfileOption[] = [
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
      id: "contact",
      title: t("profile-selection.contacto"),
      icon: <Mail size={32} />,
    },
  ];

  useEffect(() => {
    initializeLanguage();
    setCurrentSection("home");
  }, [initializeLanguage, setCurrentSection]);

  const handleNavigate = (profileId: string) => {
    setCurrentSection(profileId as any);
    navigate(`/${profileId}`);
  };
  return (
    <>
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <motion.div
          className="img"
          animate={{ scale: 1.1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
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
        </h1>{" "}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 w-full max-w-5xl">
          {profiles.map((profile) => (
            <motion.button
              key={profile.id}
              onClick={() => handleNavigate(profile.id)}
              className="group flex flex-col items-center transition-all duration-300 p-6 sm:p-8 rounded-2xl focus:outline-none focus:ring-0 active:scale-95 touch-manipulation min-h-[160px] sm:min-h-[180px]"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-4 sm:mb-6 group-hover:border-2 border-red-500 transition-all duration-300">
                <div className="scale-90 sm:scale-100 text-gray-300 group-hover:text-red-400 transition-colors duration-300">
                  {profile.icon}
                </div>
              </div>
              <span className="text-gray-400 group-hover:text-white text-base sm:text-lg font-medium text-center transition-colors duration-300">
                {profile.title}
              </span>
            </motion.button>
          ))}
        </div>
      </div>{" "}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <label className="relative inline-flex items-center cursor-pointer bg-black/80 backdrop-blur-sm rounded-full px-4 py-3 border border-gray-700 hover:border-gray-600 transition-colors touch-manipulation">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={currentLanguage === "en"}
            onChange={toggleLanguage}
          />          <div className="w-12 h-6 sm:w-14 sm:h-7 bg-gray-700 rounded-full peer-checked:bg-red-500 
        peer-focus:outline-none peer-focus:ring-0
        after:content-[''] after:absolute after:top-[14px] after:left-[18px]
        after:bg-white after:border-gray-600 after:border after:rounded-full 
        after:h-5 after:w-5 sm:after:h-6 sm:after:w-6 after:transition-all duration-300 peer-checked:after:translate-x-5 sm:peer-checked:after:translate-x-6" />
          <span className="ml-4 text-sm sm:text-base font-medium text-gray-200 select-none">
            ES / EN
          </span>
        </label>
      </motion.div>
    </>
  );
}
