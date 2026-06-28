import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import VehicleDesign from './pages/VehicleDesign'
import DevLog from './pages/DevLog'
import Sponsors from './pages/Sponsors'
import Team from './pages/Team'

function ScrollAndHighlight() {
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const search = params.get('search')
    
    // Clear previous highlights
    document.querySelectorAll('mark.search-highlight').forEach(mark => {
      const parent = mark.parentNode
      if (parent) {
        parent.replaceChild(document.createTextNode(mark.textContent || ''), mark)
        parent.normalize()
      }
    })

    if (!search) return

    // Delay to let React rendering and page transitions (Framer Motion) finish
    const timer = setTimeout(() => {
      const regex = new RegExp(`(${search})`, 'gi')
      const walk = (node: Node) => {
        if (node.nodeType === 3) { // Text node
          const match = node.nodeValue?.match(regex)
          if (match && node.nodeValue && node.parentElement && node.parentElement.tagName !== 'MARK') {
            const parts = node.nodeValue.split(regex)
            const fragment = document.createDocumentFragment()
            parts.forEach(part => {
              if (part.toLowerCase() === search.toLowerCase()) {
                const markEl = document.createElement('mark')
                markEl.className = 'search-highlight bg-accent/60 text-white rounded px-1'
                markEl.textContent = part
                fragment.appendChild(markEl)
              } else if (part) {
                fragment.appendChild(document.createTextNode(part))
              }
            })
            node.parentElement.replaceChild(fragment, node)
          }
        } else if (node.nodeType === 1 && !['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA'].includes(node.nodeName)) {
          Array.from(node.childNodes).forEach(walk)
        }
      }

      const main = document.querySelector('main')
      if (main) walk(main)

      // Scroll logic: if hash exists, it has priority. Otherwise scroll to first highlight.
      if (!location.hash) {
        const firstMark = document.querySelector('mark.search-highlight')
        if (firstMark) {
          firstMark.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      } else {
        const el = document.getElementById(location.hash.substring(1))
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 600) // 600ms to allow Framer Motion components to mount

    return () => clearTimeout(timer)
  }, [location.search, location.hash, location.pathname])

  return null
}

function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="app-container">
      <ScrollAndHighlight />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicle-design" element={<VehicleDesign />} />
          <Route path="/dev-log" element={<DevLog />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/team" element={<Team />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
