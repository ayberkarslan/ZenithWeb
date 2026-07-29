import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'
import { AlertTriangle, CheckCircle, X, Play } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './DevLog.css'

export interface MediaItem {
  type: 'image' | 'video'
  url: string
  portrait?: boolean
}

interface LogEntry {
  id: number
  tag: string
  date: string
  title: string
  shortDesc: string
  content: string
  status: 'success' | 'failure' | 'warning'
  image?: string | null
  media?: MediaItem[]
}

const modules = import.meta.glob('./blog/*.ts', { eager: true })
const devLogs: LogEntry[] = Object.values(modules)
  .map((mod: any) => mod.log as LogEntry)
  .filter(Boolean)
  .sort((a, b) => {
    const timeA = new Date(a.date).getTime()
    const timeB = new Date(b.date).getTime()
    if (timeA !== timeB) return timeB - timeA
    return b.id - a.id
  }) // Sort by newest (highest date/id) first

const ALL_TAGS = ["All", "Avionics", "Computer Vision", "Hardware", "Software"]

export default function DevLog() {
  const location = useLocation()
  const [activeTag, setActiveTag] = useState("All")
  const [selectedLog, setSelectedLog] = useState<LogEntry>(devLogs[0])
  const [zoomedMedia, setZoomedMedia] = useState<{ type: 'image'|'video', url: string } | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const postId = params.get('post')
    if (postId) {
      const log = devLogs.find(l => l.id.toString() === postId)
      if (log) {
        setSelectedLog(log)
        // Ensure tag filter isn't hiding it
        if (activeTag !== "All" && log.tag !== activeTag) {
          setActiveTag("All")
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }, [location.search])

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
                {selectedLog.id === log.id && (
                  <motion.div
                    layoutId="activeTimelineLine"
                    className="absolute bg-accent"
                    style={{ left: '-1.5rem', top: 0, bottom: '-1.5rem', width: '2px', zIndex: 5, boxShadow: '0 0 10px var(--accent-color)' }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
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

              {selectedLog.media && selectedLog.media.length > 0 ? (
                <div className={`mb-8 grid gap-4 ${selectedLog.media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {selectedLog.media.map((item, idx) => (
                    <div 
                      key={idx}
                      className={`relative rounded-2xl overflow-hidden border border-glass-border group cursor-zoom-in ${item.portrait ? 'mx-auto' : 'w-full'}`}
                      style={item.portrait ? { width: '260px', height: '460px' } : undefined}
                      onClick={() => setZoomedMedia({ type: item.type, url: item.url })}
                    >
                      {item.type === 'image' ? (
                        <img src={item.url} alt={selectedLog.title} className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <>
                          <video 
                            src={item.url} 
                            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${!item.portrait ? 'h-64' : ''}`} 
                            muted
                            playsInline
                            loop
                          />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover:bg-black/50">
                            <Play className="text-white w-12 h-12 opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-110 transform" fill="currentColor" />
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : selectedLog.image && (
                <div 
                  className="mb-8 relative rounded-2xl overflow-hidden border border-glass-border group cursor-zoom-in w-full"
                  onClick={() => setZoomedMedia({ type: 'image', url: selectedLog.image! })}
                >
                  <img src={selectedLog.image} alt={selectedLog.title} className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              )}

              <div className="prose prose-invert max-w-none">
                {renderContent(selectedLog.content)}
              </div>

              {/* Navigation */}
              <div className="mt-16 pt-8 border-t border-glass-border flex justify-between items-center gap-4">
                {devLogs.findIndex(l => l.id === selectedLog.id) < devLogs.length - 1 ? (
                  <button
                    onClick={() => setSelectedLog(devLogs[devLogs.findIndex(l => l.id === selectedLog.id) + 1])}
                    className="btn flex-1 text-center"
                    style={{ backgroundColor: '#1e3a8a', color: '#ffffff', borderColor: '#1e3a8a' }}
                  >
                    &larr; Previous (Older)
                  </button>
                ) : (
                  <div className="flex-1"></div>
                )}
                
                {devLogs.findIndex(l => l.id === selectedLog.id) > 0 ? (
                  <button
                    onClick={() => setSelectedLog(devLogs[devLogs.findIndex(l => l.id === selectedLog.id) - 1])}
                    className="btn btn-primary flex-1 text-center"
                  >
                    Next (Newer) &rarr;
                  </button>
                ) : (
                  <div className="flex-1"></div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {zoomedMedia && createPortal(
        <div 
          className="lightbox-overlay"
          onClick={() => setZoomedMedia(null)}
        >
          <button 
            className="lightbox-close"
            onClick={(e) => { e.stopPropagation(); setZoomedMedia(null); }}
          >
            <X size={32} />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {zoomedMedia.type === 'image' ? (
              <img 
                src={zoomedMedia.url} 
                alt="Enlarged view" 
                className="lightbox-image"
              />
            ) : (
              <video 
                src={zoomedMedia.url} 
                controls
                className="lightbox-image"
                style={{ outline: 'none', background: 'transparent' }}
              />
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
