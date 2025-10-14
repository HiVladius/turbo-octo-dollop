import { Link, useLocation } from "react-router-dom";
import { BookOpenCheck, Code, Home, Mail, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAppStore } from "./store";
import { useTranslation } from "react-i18next";


export function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const setCurrentSection = useAppStore((state) => state.setCurrentSection);

  if (isHome) return null;

  const handleNavigation = (section: string) => {
    setCurrentSection(section as 'home' | 'about' | 'projects' | 'contact');
    // Forzar el blur del elemento activo para ocultar tooltips
    setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }, 100);
  };

  const shakeAnimation = {
    whileHover: {
      rotate: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5, ease: "easeInOut" as const },
    },
  };
  return (
    <>
      {/* Skip Link para Accesibilidad */}
      <a 
        href="#main-content" 
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          const mainContent = document.getElementById('main-content');
          if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      >
        {t("navbar.skip-to-content")}
      </a>
      
      <nav 
        role="navigation" 
        aria-label={t("navbar.main-navigation")}
        className="fixed bottom-3 sm:bottom-3 lg:bottom-4 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur-md px-2 sm:px-4 lg:px-5 py-1 sm:py-1 rounded-full shadow-lg border border-zinc-800/50 z-50"
      >
      <ul className="flex items-center justify-center gap-5 sm:gap-4 lg:gap-7">
        <li>
          <Link
            to="/"
            className="group relative text-white/60 hover:text-white focus:text-white transition-all duration-300 p-1.5 sm:p-2.5 rounded-full active:scale-95 touch-manipulation focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
            aria-label={t("navbar.go-to-home")}
            onClick={() => handleNavigation("home")}
          >
            <motion.div {...shakeAnimation}>
              <Home size={16} className="sm:w-5 sm:h-5" />
            </motion.div>
            <span 
              id="home-tooltip"
              role="tooltip"
              className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 group-focus:opacity-0 group-active:opacity-0 transition-opacity duration-200 pointer-events-none [@media(pointer:coarse)]:hidden"
            >
              {t("navbar.home")}
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={`group relative transition-all duration-300 p-1.5 sm:p-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-900 hover:text-white
              ${
              location.pathname === "/about" ? "text-red-500" : "text-white "
            }`}
            aria-label={t("navbar.go-to-about")}
            aria-current={location.pathname === "/about" ? "page" : undefined}
            onClick={() => handleNavigation("about")}
          >
            <motion.div {...shakeAnimation}>
              <User size={16} className="sm:w-5 sm:h-5" />
            </motion.div>
            <span 
              id="about-tooltip"
              role="tooltip"
              className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 group-focus:opacity-0 group-active:opacity-0 transition-opacity duration-200 pointer-events-none [@media(pointer:coarse)]:hidden"
            >
              {t("navbar.about")}
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/projects"
            className={`group relative transition-all duration-300 p-1.5 sm:p-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-900 active:scale-95 touch-manipulation hover:text-white
              ${
              location.pathname === "/projects" ? "text-red-500 " : "text-white"
            }`}
            aria-label={t("navbar.go-to-projects")}
            aria-current={location.pathname === "/projects" ? "page" : undefined}
            onClick={() => handleNavigation("projects")}
          >
            <motion.div {...shakeAnimation}>
              <Code size={16} className="sm:w-5 sm:h-5" />
            </motion.div>
            <span 
              id="projects-tooltip"
              role="tooltip"
              className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 group-focus:opacity-0 group-active:opacity-0 transition-opacity duration-200 pointer-events-none [@media(pointer:coarse)]:hidden"
            >
              {t("navbar.projects")}
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={`group relative transition-all duration-300 p-1.5 sm:p-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-900 active:scale-95 touch-manipulation hover:text-white
              ${
              location.pathname === "/contact" ? "text-red-500 " : "text-white "
            }`}
            aria-label={t("navbar.go-to-contact")}
            aria-current={location.pathname === "/contact" ? "page" : undefined}
            onClick={() => handleNavigation("contact")}
          >
            <motion.div {...shakeAnimation}>
              <Mail size={16} className="sm:w-5 sm:h-5" />
            </motion.div>
            <span 
              id="contact-tooltip"
              role="tooltip"
              className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 group-focus:opacity-0 group-active:opacity-0 transition-opacity duration-200 pointer-events-none [@media(pointer:coarse)]:hidden"
            >
              {t("navbar.contact")}
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/Skills"
            className={`group relative transition-all duration-300 p-1.5 sm:p-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-900 active:scale-95 touch-manipulation hover:text-white
              ${
              location.pathname === "/Skills" ? "text-red-500 " : "text-white"
            }`}
            aria-label={t("navbar.go-to-skills")}
            aria-current={location.pathname === "/Skills" ? "page" : undefined}
            onClick={() => handleNavigation("skills")}
          >
            <motion.div {...shakeAnimation}>
              <BookOpenCheck size={16} className="sm:w-5 sm:h-5" />
            </motion.div>
            <span 
              id="skills-tooltip"
              role="tooltip"
              className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 group-focus:opacity-0 group-active:opacity-0 transition-opacity duration-200 pointer-events-none [@media(pointer:coarse)]:hidden"
            >
              {t("navbar.skills")}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
    </>
  );
}
