import { Link, useLocation } from "react-router-dom";
import { BookOpenCheck, Code, Home, Mail, User } from "lucide-react";
import { motion } from "framer-motion";
import { useAppStore } from "./store";

export function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const setCurrentSection = useAppStore((state) => state.setCurrentSection);

  if (isHome) return null;

  const handleNavigation = (section: string) => {
    setCurrentSection(section as any);
  };

  const shakeAnimation = {
    whileHover: {
      rotate: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };
  return (
    <nav className="fixed bottom-3 sm:bottom-3 lg:bottom-4 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur-md px-2 sm:px-4 lg:px-5 py-1 sm:py-1 rounded-full shadow-lg border border-zinc-800/50 z-50">
      <ul className="flex items-center justify-center gap-5 sm:gap-4 lg:gap-7">
        <li>
          <Link
            to="/"
            className="group relative text-white/60  transition-all duration-300 p-1.5 sm:p-2.5 rounded-full  active:scale-95 touch-manipulation"
            title="Home"
            onClick={() => handleNavigation("home")}
          >
            <motion.div {...shakeAnimation}>
              <Home size={16} className="sm:w-5 sm:h-5" />
            </motion.div>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Inicio
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={`group relative transition-all duration-300 p-1.5 sm:p-2.5 rounded-full focus:outline-none focus:ring-1 
              ${
              location.pathname === "/about" ? "text-red-500" : "text-white "
            }`}
            title="About"
            onClick={() => handleNavigation("about")}
          >
            <motion.div {...shakeAnimation}>
              <User size={16} className="sm:w-5 sm:h-5" />
            </motion.div>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Acerca de
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/projects"
            className={`group relative transition-all duration-300 p-1.5 sm:p-2.5 rounded-full focus:outline-none  active:scale-95 touch-manipulation 
              ${
              location.pathname === "/projects" ? "text-red-500 " : "text-white"
            }`}
            title="Projects"
            onClick={() => handleNavigation("projects")}
          >
            <motion.div {...shakeAnimation}>
              <Code size={16} className="sm:w-5 sm:h-5" />
            </motion.div>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Proyectos
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={`group relative transition-all duration-300 p-1.5 sm:p-2.5 rounded-full focus:outline-none  active:scale-95 touch-manipulation 
              ${
              location.pathname === "/contact" ? "text-red-500 " : "text-white "
            }`}
            title="Contact"
            onClick={() => handleNavigation("contact")}
          >
            <motion.div {...shakeAnimation}>
              <Mail size={16} className="sm:w-5 sm:h-5" />
            </motion.div>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white  text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Contacto
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/Skills"
            className={`group relative transition-all duration-300 p-1.5 sm:p-2.5 rounded-full focus:outline-none  active:scale-95 touch-manipulation 
              ${
              location.pathname === "/Skills" ? "text-red-500 " : "text-white"
            }`}
            title="Skills"
            onClick={() => handleNavigation("skills")}
          >
            <motion.div {...shakeAnimation}>
              <BookOpenCheck size={16} className="sm:w-5 sm:h-5" />
            </motion.div>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Habilidades
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
