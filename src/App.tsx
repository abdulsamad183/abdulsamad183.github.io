import { useState } from 'react'
import { JarvisBoot } from './components/portfolio/JarvisBoot'
import { PortfolioSite } from './components/portfolio/PortfolioSite'

export default function App() {
  const [booted, setBooted] = useState(false)

  return (
    <>
      {!booted && <JarvisBoot onComplete={() => setBooted(true)} />}
      {booted && <PortfolioSite />}
    </>
  )
}
