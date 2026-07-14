import { useEffect, useState } from 'react'
import { profile } from '../../data'

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

const HIRE_MAILTO = `mailto:${profile.email}?subject=${encodeURIComponent('Opportunity — GenAI / Agentic AI')}`

export function Navbar() {
  const [active, setActive] = useState('about')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)

      const sections = NAV.map((n) => document.getElementById(n.id))
      const scrollPos = window.scrollY + 120

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i]
        if (el && el.offsetTop <= scrollPos) {
          setActive(NAV[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${
        scrolled ? 'border-b border-jarvis-cyan/10 bg-jarvis-bg/90 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#hero" className="font-display text-sm font-bold tracking-[0.25em] text-jarvis-cyan uppercase">
          J<span className="text-jarvis-text">·</span>ARVIS
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link font-display text-[0.65rem] tracking-[0.2em] uppercase ${active === item.id ? 'active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={HIRE_MAILTO}
          className="font-display border border-jarvis-cyan/40 px-3 py-1.5 text-[0.65rem] tracking-[0.15em] text-jarvis-cyan uppercase transition hover:bg-jarvis-cyan/10"
        >
          Hire Me
        </a>
      </div>
    </header>
  )
}
