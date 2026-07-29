import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight, ChevronLeft, X } from 'lucide-react'
import { useState } from 'react'
import { createPortal } from 'react-dom'

const galleryImages = [
  "/gallery/IMG_2511.jpg",
  "/gallery/IMG_2511_3.jpg",
  "/gallery/IMG_2522.jpg",
  "/gallery/IMG_2522_2.jpg",
  "/gallery/IMG_2562.jpg"
];
import './VehicleDesign.css'

export default function VehicleDesign() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="vehicle-design-page bg-[#030712] text-white min-h-screen font-sans">
      {/* Lightbox Modal */}
      {selectedIndex !== null && createPortal(
        <div 
          className="lightbox-overlay"
          onClick={() => setSelectedIndex(null)}
        >
          <button 
            className="lightbox-close"
            onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
          >
            <X size={32} />
          </button>
          
          <button 
            className="lightbox-prev"
            onClick={(e) => { 
              e.stopPropagation(); 
              setSelectedIndex(prev => prev === 0 ? galleryImages.length - 1 : prev! - 1); 
            }}
          >
            <ChevronLeft size={48} />
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={galleryImages[selectedIndex]} 
              alt="Fullscreen preview" 
              className="lightbox-image"
            />
          </div>

          <button 
            className="lightbox-next"
            onClick={(e) => { 
              e.stopPropagation(); 
              setSelectedIndex(prev => prev === galleryImages.length - 1 ? 0 : prev! + 1); 
            }}
          >
            <ChevronRight size={48} />
          </button>
        </div>,
        document.body
      )}
      
      {/* New Cinematic Hero Section */}
      <section className="w-full flex flex-col items-center justify-start bg-[#030712] pt-24 md:pt-32 pb-8">
        <div className="relative w-full max-w-[1920px] mx-auto shadow-2xl border-y border-gray-800/60" style={{ aspectRatio: '21/9' }}>
          <img src="/HEYULA.png" alt="HEYULA 3D Render" className="absolute inset-0 w-full h-full object-cover object-center" />
          
          {/* Subtle gradient to ensure text readability at the bottom (desktop only) */}
          <div className="desktop-stats absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none"></div>
          
          {/* Desktop Stats Overlay - Bottom Left */}
          <div className="desktop-stats absolute pointer-events-none" style={{ bottom: '3rem', left: '4rem' }}>
            <motion.div 
              style={{ display: 'flex', gap: '4rem' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="stat-block text-left">
                <div className="font-bold text-white mb-1" style={{ fontSize: '3rem', lineHeight: '1' }}>8.75<span className="text-gray-400 ml-1" style={{ fontSize: '1.25rem' }}>kg</span></div>
                <div className="text-gray-400 uppercase tracking-widest font-bold" style={{ fontSize: '0.875rem' }}>MTOW</div>
              </div>
              <div className="stat-block text-left">
                <div className="font-bold text-white mb-1" style={{ fontSize: '3rem', lineHeight: '1' }}>32<span className="text-gray-400 ml-1" style={{ fontSize: '1.25rem' }}>min</span></div>
                <div className="text-gray-400 uppercase tracking-widest font-bold" style={{ fontSize: '0.875rem' }}>Flight Time</div>
              </div>
            </motion.div>
          </div>

          {/* Desktop Stats Overlay - Bottom Right */}
          <div className="desktop-stats absolute pointer-events-none" style={{ bottom: '3rem', right: '4rem' }}>
            <motion.div 
              style={{ display: 'flex', gap: '4rem' }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="stat-block text-right">
                <div className="font-bold text-white mb-1" style={{ fontSize: '3rem', lineHeight: '1' }}>8<span className="text-gray-400 ml-1" style={{ fontSize: '1.25rem' }}>kg</span></div>
                <div className="text-gray-400 uppercase tracking-widest font-bold" style={{ fontSize: '0.875rem' }}>Payload Cap</div>
              </div>
              <div className="stat-block text-right">
                <div className="font-bold text-white mb-1" style={{ fontSize: '3rem', lineHeight: '1' }}>20<span className="text-gray-400 ml-1" style={{ fontSize: '1.25rem' }}>km</span></div>
                <div className="text-gray-400 uppercase tracking-widest font-bold" style={{ fontSize: '0.875rem' }}>Telemetry Range</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Stats Grid - Below the image */}
        <div className="mobile-stats w-full px-4 pt-6 pb-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="stat-block text-center bg-gray-900/50 rounded-xl p-3 border border-gray-800 shadow-lg">
              <div className="font-bold text-white mb-1 text-2xl">8.75<span className="text-gray-400 ml-1 text-sm">kg</span></div>
              <div className="text-gray-400 uppercase tracking-widest font-bold text-[10px]">MTOW</div>
            </div>
            <div className="stat-block text-center bg-gray-900/50 rounded-xl p-3 border border-gray-800 shadow-lg">
              <div className="font-bold text-white mb-1 text-2xl">32<span className="text-gray-400 ml-1 text-sm">min</span></div>
              <div className="text-gray-400 uppercase tracking-widest font-bold text-[10px]">Flight Time</div>
            </div>
            <div className="stat-block text-center bg-gray-900/50 rounded-xl p-3 border border-gray-800 shadow-lg">
              <div className="font-bold text-white mb-1 text-2xl">8<span className="text-gray-400 ml-1 text-sm">kg</span></div>
              <div className="text-gray-400 uppercase tracking-widest font-bold text-[10px]">Payload Cap</div>
            </div>
            <div className="stat-block text-center bg-gray-900/50 rounded-xl p-3 border border-gray-800 shadow-lg">
              <div className="font-bold text-white mb-1 text-2xl">20<span className="text-gray-400 ml-1 text-sm">km</span></div>
              <div className="text-gray-400 uppercase tracking-widest font-bold text-[10px]">Range</div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Process - Web Format */}
      <section className="bg-[#030712] relative z-10" style={{ paddingTop: '16rem', paddingBottom: '8rem' }}>
        <div className="container max-w-6xl">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h2 className="text-4xl font-bold mb-6">Engineering the Machine</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Real engineering isn't just about the final product. It's about the decisions, the failures, and the iterative testing. Here is how HEYULA was built for the SUAS 2026 mission.
            </p>
          </div>



          {/* Section 1: Mechanical */}
          <div id="airframe" className="grid md:grid-cols-2 gap-16 items-center" style={{ marginBottom: '10rem' }}>
            <div>
              <div className="text-accent text-sm font-bold tracking-widest uppercase mb-3">01 / Airframe</div>
              <h3 className="text-3xl font-bold mb-6">Carbon Fiber Rigidity</h3>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                To achieve the ultimate balance between weight and structural integrity, our airframe is constructed heavily using 3K Carbon Fiber. This aerospace-grade material provides exceptional tensile strength while keeping the overall vehicle mass to an absolute minimum.
              </p>
              <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
                <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wider">Material Advantage</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Unlike traditional aluminum structures that can permanently deform or transmit excessive motor vibrations to the flight controller, 3K carbon fiber naturally absorbs micro-vibrations. This results in a highly rigid frame that ensures ultra-stable autonomous flight.
                </p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden border border-accent/30 hover:border-accent/60 transition-colors duration-500 shadow-2xl flex items-center justify-center">
              <img src="/carbon-fiber.jpg" alt="Carbon Fiber Rigidity" className="w-full h-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
            </div>
          </div>

          {/* Section 2: Avionics */}
          <div id="avionics" className="grid md:grid-cols-2 gap-16 items-center" style={{ marginBottom: '10rem' }}>
            <div className="rounded-3xl overflow-hidden border border-accent/30 hover:border-accent/60 transition-colors duration-500 shadow-2xl md:order-1 order-2 flex items-center justify-center">
              <img src="/avionics.png" alt="Pixhawk and Jetson" className="w-full h-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
            </div>
            <div className="md:order-2 order-1">
              <div className="text-accent text-sm font-bold tracking-widest uppercase mb-3">02 / Avionics</div>
              <h3 className="text-3xl font-bold mb-6">Pixhawk + Jetson Bridge</h3>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                The brain of HEYULA is a tightly coupled architecture between the <strong>Pixhawk Cube Orange</strong> and the <strong>NVIDIA Jetson Orin Nano</strong>. The Pixhawk handles hard-real-time flight dynamics and triple-redundant state estimation, while the Jetson provides massive GPU compute for high-level AI tasks. Operating over a high-baud serial bridge, this duo offers flawless plug-and-play compatibility and zero-bottleneck data throughput.
              </p>
              <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl border-l-4 border-l-accent">
                <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wider">Seamless Integration</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  The robust communication bridge between the companion computer and flight controller allows HEYULA to execute complex, AI-driven autonomous maneuvers in real-time, ensuring absolute stability even during dynamic wind conditions.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Software / Mission Planner */}
          <div id="software" className="grid md:grid-cols-2 gap-16 items-center" style={{ marginBottom: '10rem' }}>
            <div>
              <div className="text-accent text-sm font-bold tracking-widest uppercase mb-3">03 / Software</div>
              <h3 className="text-3xl font-bold mb-6">Visual Node-Based Mission Planner</h3>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                Instead of hardcoding missions or relying on generic ground control stations, we developed our own proprietary node-based mission planning software. This tool allows us to visually drag, drop, and connect mission waypoints, payload drop triggers, and camera activation nodes into a cohesive, logic-driven flowchart.
              </p>
              <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
                <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wider">Operational Advantage</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  During SUAS, mission coordinates are given just before flight. Our visual node system reduces mission generation time from 10 minutes to under 60 seconds, drastically minimizing human error under pressure.
                </p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden border border-accent/30 hover:border-accent/60 transition-colors duration-500 shadow-2xl flex items-center justify-center">
              <img src="/visual-node.png" alt="Node Based Mission Planner" className="w-full h-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
            </div>
          </div>

          {/* Section 4: AI & Vision */}
          <div id="cv" className="grid md:grid-cols-2 gap-16 items-center">
            <div className="h-[500px] rounded-3xl overflow-hidden border border-accent/30 hover:border-accent/60 transition-colors duration-500 shadow-2xl md:order-1 order-2">
              <img src="/yolo.png" alt="YOLO Object Detection" className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
            </div>
            <div className="md:order-2 order-1">
              <div className="text-accent text-sm font-bold tracking-widest uppercase mb-3">04 / Computer Vision</div>
              <h3 className="text-3xl font-bold mb-6">Custom Trained YOLO Architecture</h3>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                For the SUAS target identification task, standard pre-trained models are insufficient. We painstakingly collected, augmented, and labeled a dataset of over 10,000 aerial images of specific alphanumeric targets, training our own specialized YOLO model.
              </p>
              <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl border-l-4 border-l-accent">
                <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wider">Hardware Optimization</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  The entire vision pipeline is strictly optimized to run on the <strong>NVIDIA Jetson Orin Nano</strong>. By maximizing edge-compute capabilities, our model achieves seamless real-time target acquisition and classification under intense flight dynamics.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Image Gallery */}
      <section className="bg-[#030712] relative z-10" style={{ marginTop: '2rem', marginBottom: '4rem' }}>
        <div className="container max-w-5xl">
          <h2 className="text-xl font-bold mb-4 text-center text-gray-400 tracking-wide uppercase">Moments from the Lab</h2>
          <div className="w-full overflow-hidden relative rounded-xl shadow-lg" style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '1rem 0' }}>
            <div className="marquee-container" style={{ display: 'flex', gap: '0.75rem', padding: '0 0.75rem' }}>
              {[...galleryImages, ...galleryImages, ...galleryImages].map((src, idx) => {
                const originalIndex = idx % galleryImages.length;
                return (
                  <div 
                    key={idx} 
                    className="gallery-item"
                    onClick={() => setSelectedIndex(originalIndex)}
                  >
                    <img src={src} alt={`Gallery ${originalIndex}`} className="gallery-image" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action -> Dev Log */}
      <section className="bg-[#030712] relative z-10" style={{ marginTop: '6rem', marginBottom: '12rem', paddingBottom: '4rem' }}>
        <div className="container max-w-4xl text-center border border-gray-800/60 bg-gray-900/30 rounded-3xl p-16 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Dive Deeper</h2>
          <p className="text-xl text-gray-400 leading-relaxed" style={{ marginBottom: '3rem' }}>
            Follow our weekly development logs to see exactly how we build, test, and iterate on these systems for SUAS 2026.
          </p>
          <Link to="/dev-log" className="btn btn-primary inline-flex items-center text-lg px-8 py-4 rounded-full transition-transform hover:scale-105" style={{ marginTop: '1rem' }}>
            See How We Build <ChevronRight size={24} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  )
}
