import { useState } from 'react'
import { AlertTriangle, CheckCircle, ChevronRight, Maximize2, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './DevLog.css'

interface LogEntry {
  id: number
  tag: string
  date: string
  title: string
  shortDesc: string
  content: string
  status: 'success' | 'failure' | 'warning'
  image: string | null
}

const devLogs: LogEntry[] = [
  {
    id: 1,
    tag: "Avionics",
    date: "May 15, 2026",
    title: "Autonomous Waypoint Mission Success",
    shortDesc: "Tuned L1 navigation controller parameters for heavier payloads, resulting in successful autonomous flight.",
    content: "### Problem\nPrevious flights resulted in 2-3 meter cross-track error in high winds. The drone struggled to maintain a straight line between distant waypoints.\n\n### Analysis\nLog analysis via PX4 showed the L1 navigation controller parameters were tuned too aggressively for our new heavier payload. The excessive overshoot was a classic sign of underdamping.\n\n### Solution & Lessons Learned\nReduced nav_l1_period to 12.0s and increased nav_l1_damping to 0.85. The vehicle now smoothly tracks lines even with 15-knot gusts. We learned that payload mass drastically changes aerodynamic damping requirements.",
    status: "success",
    image: null
  },
  {
    id: 2,
    tag: "Computer Vision",
    date: "May 02, 2026",
    title: "Real-time Object Detection Integration",
    shortDesc: "Deployed YOLOv8 on Jetson Orin NX for real-time target acquisition.",
    content: "### The Challenge\nThe SUAS mission requires us to detect and classify alphanumeric targets on the ground from 100+ feet in the air, in real time.\n\n### Implementation\nWe integrated a custom-trained YOLOv8 model running on an onboard NVIDIA Jetson Orin NX. The telemetry overlay is fused directly with the camera feed to geolocate the targets.\n\n### Results\nInference time is down to 12ms. Accuracy is hovering around 94% on test datasets. We're very confident in this pipeline.",
    status: "success",
    image: "/log-cv.jpg"
  },
  {
    id: 3,
    tag: "Hardware",
    date: "April 22, 2026",
    title: "Motor Vibration & Compass Drift Issue",
    shortDesc: "Identified and fixed severe compass variance caused by arm resonance.",
    content: "### Problem\nDuring hover tests, EKF2 reported severe compass variance. The drone entered failsafe mode and initiated an emergency landing.\n\n### Analysis\nFFT data from the blackbox indicated excessive vibrations at 80Hz reaching the flight controller. The 3K carbon fiber arms were resonating exactly at the hover RPM.\n\n### Solution\nWe redesigned the motor mounts to include TPU isolation dampers, decoupling the high-frequency vibrations from the frame. We also moved the GPS/Compass module to a 15cm mast to reduce electromagnetic interference from the high-current ESC wires.",
    status: "failure",
    image: "/log-motor.jpg"
  }
]

const ALL_TAGS = ["All", "Avionics", "Computer Vision", "Hardware"]

export default function DevLog() {
  const [activeTag, setActiveTag] = useState("All")
  const [selectedLog, setSelectedLog] = useState<LogEntry>(devLogs[0])
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)

  const filteredLogs = activeTag === "All" ? devLogs : devLogs.filter(l => l.tag === activeTag)

  const renderContent = (content: string) => {
    return content.split('\n\n').map((block, idx) => {
      if (block.startsWith('### ')) {
        const title = block.replace('### ', '')
        const nextLineIdx = title.indexOf('\n')
        if (nextLineIdx !== -1) {
          return (
            <div key={idx} className="mb-6">
              <h4 className="text-xl font-bold text-accent mb-2">{title.substring(0, nextLineIdx)}</h4>
              <p className="text-muted leading-relaxed">{title.substring(nextLineIdx + 1)}</p>
            </div>
          )
        }
        return <h4 key={idx} className="text-xl font-bold text-accent mb-2 mt-6">{title}</h4>
      }
      return <p key={idx} className="text-muted leading-relaxed mb-6">{block}</p>
    })
  }

  return (
    <div className="pt-32 pb-24 container">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-5xl mb-4 font-bold tracking-tight">Engineering DevLog</h1>
        <p className="text-xl text-muted max-w-3xl mb-12">
          Transparent, chronological record of our mission progress. True engineering happens in the failures and how we overcome them.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12">
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => {
                setActiveTag(tag)
                const firstLog = (tag === "All" ? devLogs : devLogs.filter(l => l.tag === tag))[0]
                if (firstLog) setSelectedLog(firstLog)
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTag === tag 
                  ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                  : 'bg-glass border border-glass-border text-muted hover:text-primary'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Split Layout */}
      <div className="dev-log-layout relative">
        
        {/* Timeline List (Left Panel) */}
        <div className="timeline-container">
          <div className="timeline-line"></div>
          <AnimatePresence mode="popLayout">
            {filteredLogs.map((log) => (
              <motion.div 
                key={log.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`timeline-item cursor-pointer group ${selectedLog.id === log.id ? 'active' : ''}`}
                onClick={() => setSelectedLog(log)}
              >
                <div className={`timeline-dot ${selectedLog.id === log.id ? 'bg-accent' : 'bg-muted'}`}></div>
                <div className="card transition-all group-hover:border-accent/50">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-accent uppercase tracking-wider bg-accent/10 px-2 py-1 rounded-md">{log.tag}</span>
                    <span className="text-xs text-muted font-medium">{log.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">{log.title}</h3>
                  <p className="text-sm text-muted line-clamp-2">{log.shortDesc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Detailed View (Right Panel) */}
        <div className="sticky top-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="card border-accent/20 shadow-2xl p-8 lg:p-12 relative overflow-hidden"
            >
              {/* Background ambient glow */}
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent rounded-full blur-[100px] opacity-10 pointer-events-none"></div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-accent tracking-widest uppercase">{selectedLog.date}</span>
                <div className="flex items-center gap-2 text-sm font-medium">
                  {selectedLog.status === 'success' ? (
                    <span className="flex items-center gap-1 text-green-500 bg-green-500/10 px-3 py-1 rounded-full"><CheckCircle size={16} /> Verified</span>
                  ) : selectedLog.status === 'failure' ? (
                    <span className="flex items-center gap-1 text-red-500 bg-red-500/10 px-3 py-1 rounded-full"><AlertTriangle size={16} /> Critical Log</span>
                  ) : null}
                </div>
              </div>

              <h2 className="text-3xl font-bold mb-8 leading-tight">{selectedLog.title}</h2>

              {selectedLog.image && (
                <div 
                  className="mb-8 relative rounded-2xl overflow-hidden border border-glass-border group cursor-zoom-in"
                  onClick={() => setZoomedImage(selectedLog.image)}
                >
                  <img src={selectedLog.image} alt={selectedLog.title} className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="text-white w-8 h-8" />
                  </div>
                </div>
              )}

              <div className="prose prose-invert max-w-none">
                {renderContent(selectedLog.content)}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setZoomedImage(null)}
          >
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={zoomedImage} 
              alt="Enlarged view" 
              className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
