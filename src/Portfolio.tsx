import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { LoadingScreen } from './LoadingScreen'
import { ProfileSelector } from './ProfileSelector'
import { AboutSection } from './components/about/AboutSection'
import { ProjectsSection } from './components/projects/ProjectsSection'
import { ContactSection } from './components/contact/ContactSection'
import { Skills } from './components/skill/Skills'

import { Navbar } from './Navbar'
import { NotFound } from './NotFound'
import { useAppStore, useStoreInitialization } from './store'

import '../src/translator/config'

export const Portfolio = () => {
  const isLoading = useAppStore((state) => state.isLoading)
  const setLoading = useAppStore((state) => state.setLoading)
  
  // Initialize all stores
  useStoreInitialization()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000);
 
    return () => clearTimeout(timer)
  }, [setLoading])

  if (isLoading) {
    return (
      <LoadingScreen />
    )
  }
 


  return (
    <Router>
      <div className="portfolio">
        <Navbar />
        <Routes>
          <Route path="/" element={<ProfileSelector />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/projects" element={<ProjectsSection />} />
          <Route path="/contact" element={<ContactSection />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}
