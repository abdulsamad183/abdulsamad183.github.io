import { HudBackground } from './HudBackground'
import { Navbar } from './Navbar'
import { Hero } from './Hero'
import { AboutSection } from './AboutSection'
import { SkillsSection } from './SkillsSection'
import { ExperienceSection } from './ExperienceSection'
import { ProjectsSection } from './ProjectsSection'
import { ResearchSection } from './ResearchSection'
import { EducationSection } from './EducationSection'
import { ContactSection } from './ContactSection'
import { Footer } from './Footer'

export function PortfolioSite() {
  return (
    <div className="relative min-h-screen">
      <HudBackground />
      <div className="relative z-10 hud-flicker">
        <Navbar />
        <main>
          <Hero />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <ResearchSection />
          <EducationSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
