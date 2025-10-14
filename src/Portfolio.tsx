import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { LoadingScreen } from "./LoadingScreen";
import { Navbar } from "./Navbar";
import { useAppStore, useStoreInitialization } from "./store";

import "../src/translator/config";

const ProfileSelector = lazy(() =>
  import("./ProfileSelector").then((module) => ({
    default: module.ProfileSelector,
  }))
);
const AboutSection = lazy(() =>
  import("./components/about/AboutSection").then((module) => ({
    default: module.AboutSection,
  }))
);
const ProjectsSection = lazy(() =>
  import("./components/projects/ProjectsSection").then((module) => ({
    default: module.ProjectsSection,
  }))
);
const ContactSection = lazy(() =>
  import("./components/contact/ContactSection").then((module) => ({
    default: module.ContactSection,
  }))
);
const Skills = lazy(() =>
  import("./components/skill/Skills").then((module) => ({
    default: module.Skills,
  }))
);
const NotFound = lazy(() =>
  import("./NotFound").then((module) => ({ default: module.NotFound }))
);

export const Portfolio = () => {
  const isLoading = useAppStore((state) => state.isLoading);
  const setLoading = useAppStore((state) => state.setLoading);
  const [showContent, setShowContent] = useState(false);

  useStoreInitialization();

  useEffect(() => {
    // Eliminar el temporizador artificial
    // setLoading(false) se llamará cuando el contenido real esté listo
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setShowContent(true);
      }, 100);
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  // Simulamos la carga de contenido. En una app real, esto dependería de llamadas a API, etc.
  useEffect(() => {
    // Aquí irían las cargas de datos
    // Una vez completadas, llamamos a handleLoadingComplete
    handleLoadingComplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <Router>
      <div
        className={`portfolio transition-opacity duration-700 ease-out ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />
        <main id="main-content" role="main">
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <ProfileSelector />
                  </>
                }
              />
              <Route
                path="/about"
                element={
                  <>
                    <AboutSection />
                  </>
                }
              />
              <Route
                path="/projects"
                element={
                  <>
                    <ProjectsSection />
                  </>
                }
              />
              <Route
                path="/contact"
                element={
                  <>
                    <ContactSection />
                  </>
                }
              />
              <Route
                path="/skills"
                element={
                  <>
                    <Skills />
                  </>
                }
              />
              <Route
                path="*"
                element={
                  <>
                    <NotFound />
                  </>
                }
              />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};
