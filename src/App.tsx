import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import DevLog from './pages/DevLog'
import Team from './pages/Team'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/dev-log" element={<DevLog />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
