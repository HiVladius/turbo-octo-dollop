import { Link, useLocation } from "react-router-dom";
import { Code, Home, Mail, User, BookOpenCheck } from "lucide-react";
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
    <nav className="fixed bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-full shadow-lg border border-zinc-800/50 z-50">
      <ul className="flex items-center justify-center gap-6 sm:gap-8 lg:gap-10">
        <li>
          <Link
            to="/"
            className="group relative text-white/60  transition-all duration-300 p-2 sm:p-3 rounded-full hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-white/20 active:scale-95 touch-manipulation"
            title="Home"
            onClick={() => handleNavigation("home")}
          >
            <motion.div {...shakeAnimation}>
              <Home size={20} className="sm:w-6 sm:h-6" />
            </motion.div>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Inicio
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={`group relative transition-all duration-300 p-2 sm:p-3 rounded-full focus:outline-none focus:ring-1 focus:ring-white/20 active:scale-95 touch-manipulation 
              ${location.pathname === "/about"
                ? "text-red-500 bg-red-500/10"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
            title="About"
            onClick={() => handleNavigation("about")}
          >
            <motion.div {...shakeAnimation}>
              <User size={20} className="sm:w-6 sm:h-6" />
            </motion.div>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Acerca de
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/projects"
            className={`group relative transition-all duration-300 p-2 sm:p-3 rounded-full focus:outline-none focus:ring-1 focus:ring-white/20 active:scale-95 touch-manipulation 
              ${location.pathname === "/projects"
                ? "text-red-500 bg-red-500/10"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
            title="Projects"
            onClick={() => handleNavigation("projects")}
          >
            <motion.div {...shakeAnimation}>
              <Code size={20} className="sm:w-6 sm:h-6" />
            </motion.div>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Proyectos
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={`group relative transition-all duration-300 p-2 sm:p-3 rounded-full focus:outline-none focus:ring-1 focus:ring-white/20 active:scale-95 touch-manipulation 
              ${location.pathname === "/contact"
                ? "text-red-500 bg-red-500/10"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
            title="Contact"
            onClick={() => handleNavigation("contact")}
          >
            <motion.div {...shakeAnimation}>
              <Mail size={20} className="sm:w-6 sm:h-6" />
            </motion.div>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Contacto
            </span>
          </Link>
        </li>
        <li>
          <Link
            to="/Skills"
            className={`group relative transition-all duration-300 p-2 sm:p-3 rounded-full focus:outline-none focus:ring-1 focus:ring-white/20 active:scale-95 touch-manipulation 
              ${location.pathname === "/Skills"
                ? "text-red-500 bg-red-500/10"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
            title="Contact"
            onClick={() => handleNavigation("contact")}
          >
            <motion.div {...shakeAnimation}>
              <BookOpenCheck size={20} className="sm:w-6 sm:h-6" />
            </motion.div>
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Contacto
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
