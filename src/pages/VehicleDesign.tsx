import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Environment, ContactShadows, useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
import './VehicleDesign.css'

function RealDrone() {
  const { scene } = useGLTF('/zifirDrone.glb')
  const droneRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (droneRef.current) {
      droneRef.current.rotation.y += 0.005
    }
  })

  return (
    <group position={[0, -1.5, 0]} ref={droneRef}>
      <primitive object={scene} scale={15} />
    </group>
  )
}

useGLTF.preload('/zifirDrone.glb')

export default function VehicleDesign() {
  return (
    <div className="vehicle-design-page bg-[#030712] text-white min-h-screen font-sans">
      
      {/* SpaceX Style Hero */}
      <section className="relative h-screen flex flex-col items-center justify-start pt-32 md:pt-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
            <ambientLight intensity={0.7} />
            <spotLight position={[5, 10, 5]} angle={0.3} penumbra={1} intensity={2.5} castShadow />
            <Float speed={2} rotationIntensity={0.2} floatIntensity={1.5}>
              <RealDrone />
            </Float>
            <ContactShadows position={[0, -3, 0]} opacity={0.6} scale={30} blur={3} far={4} color="#0A84FF" />
            <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 1.5} autoRotate autoRotateSpeed={0.5} />
            <Environment preset="city" />
          </Canvas>
        </div>
        
        {/* Overlay gradient so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-[#030712] pointer-events-none z-0"></div>

        <div className="relative z-10 container flex flex-col items-center text-center pointer-events-none">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            ZIFIR <span className="text-accent">X1</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-400 tracking-widest uppercase mb-12 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Next-Generation Autonomous Aerial System
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-gray-800/60 w-full max-w-4xl backdrop-blur-sm bg-black/10 rounded-3xl p-8"
            style={{ marginTop: '3rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="stat-block text-center">
              <div className="text-4xl font-bold text-white mb-1">4.2<span className="text-lg text-gray-500 ml-1">kg</span></div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">MTOW</div>
            </div>
            <div className="stat-block text-center">
              <div className="text-4xl font-bold text-white mb-1">28<span className="text-lg text-gray-500 ml-1">min</span></div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">Flight Time</div>
            </div>
            <div className="stat-block text-center">
              <div className="text-4xl font-bold text-white mb-1">1.5<span className="text-lg text-gray-500 ml-1">kg</span></div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">Payload Cap</div>
            </div>
            <div className="stat-block text-center">
              <div className="text-4xl font-bold text-white mb-1">12<span className="text-lg text-gray-500 ml-1">ms</span></div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">AI Latency</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Engineering Process - Web Format */}
      <section className="bg-[#030712] relative z-10" style={{ paddingTop: '8rem', paddingBottom: '8rem', marginTop: '4rem' }}>
        <div className="container max-w-6xl">
          <div className="text-center" style={{ marginBottom: '8rem' }}>
            <h2 className="text-4xl font-bold mb-6">Engineering the Machine</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Real engineering isn't just about the final product. It's about the decisions, the failures, and the iterative testing. Here is how ZIFIR was built for the SUAS 2026 mission.
            </p>
          </div>

          {/* Section 1: Mechanical */}
          <div className="grid md:grid-cols-2 gap-16 items-center" style={{ marginBottom: '10rem' }}>
            <div>
              <div className="text-accent text-sm font-bold tracking-widest uppercase mb-3">01 / Airframe</div>
              <h3 className="text-3xl font-bold mb-6">Carbon Fiber Rigidity</h3>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                Early prototypes utilized aluminum arms which introduced severe harmonic vibrations at 80Hz, causing compass drift. By transitioning to a full 3K carbon fiber topology, we decoupled the resonance frequency from the motor RPM range.
              </p>
              <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
                <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Trade-off Analysis</h4>
                <ul className="text-gray-400 space-y-4">
                  <li className="flex justify-between border-b border-gray-800 pb-3">
                    <span className="font-medium text-white">Aluminum 6061</span> 
                    <span className="text-red-400/80">High vibration transfer (80Hz)</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-white">3K Carbon Fiber</span> 
                    <span className="text-green-400/80">40% lighter, dampens &gt;70Hz</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="h-[500px] rounded-3xl overflow-hidden border border-gray-800/60 shadow-2xl">
              <img src="/zifir.jpg" alt="Zifir Drone Frame" className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
            </div>
          </div>

          {/* Section 2: Avionics */}
          <div className="grid md:grid-cols-2 gap-16 items-center" style={{ marginBottom: '10rem' }}>
            <div className="h-[500px] rounded-3xl overflow-hidden border border-gray-800/60 shadow-2xl md:order-1 order-2">
              <img src="/zifir.jpg" alt="Avionics testing" className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
            </div>
            <div className="md:order-2 order-1">
              <div className="text-accent text-sm font-bold tracking-widest uppercase mb-3">02 / Avionics</div>
              <h3 className="text-3xl font-bold mb-6">Pixhawk & Jetson Synergy</h3>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                The brain of ZIFIR X1 is a tightly coupled architecture between the <strong>Pixhawk Cube Orange</strong> and the <strong>NVIDIA Jetson Orin Nano</strong>. The Pixhawk handles hard-real-time flight dynamics and triple-redundant state estimation, while the Jetson provides massive GPU compute for high-level AI tasks. Operating over a high-baud serial bridge, this duo offers flawless plug-and-play compatibility and zero-bottleneck data throughput.
              </p>
              <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl border-l-4 border-l-accent">
                <h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wider">Test #14: High-Bandwidth Telemetry</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  During intensive flight maneuvers, the Jetson streams offboard control setpoints to the Pixhawk at 100Hz with less than 2ms latency, enabling buttery-smooth autonomous trajectory tracking.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Software / Mission Planner */}
          <div className="grid md:grid-cols-2 gap-16 items-center" style={{ marginBottom: '10rem' }}>
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
            <div className="h-[500px] rounded-3xl overflow-hidden border border-gray-800/60 shadow-2xl">
              <img src="/node.jpg" alt="Node Based Mission Planner" className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
            </div>
          </div>

          {/* Section 4: AI & Vision */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="h-[500px] rounded-3xl overflow-hidden border border-gray-800/60 shadow-2xl md:order-1 order-2">
              <img src="/yolo.jpg" alt="YOLO Object Detection" className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700" />
            </div>
            <div className="md:order-2 order-1">
              <div className="text-accent text-sm font-bold tracking-widest uppercase mb-3">04 / Computer Vision</div>
              <h3 className="text-3xl font-bold mb-6">Custom Trained YOLO Architecture</h3>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                For the SUAS target identification task, standard pre-trained models are insufficient. We painstakingly collected, augmented, and labeled a dataset of over 10,000 aerial images of specific alphanumeric targets, training our own specialized YOLO model.
              </p>
              <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl border-l-4 border-l-accent">
                <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Performance Metrics</h4>
                <ul className="text-gray-400 space-y-4">
                  <li className="flex justify-between border-b border-gray-800 pb-3">
                    <span className="font-medium text-white">Inference Speed</span> 
                    <span className="text-accent font-bold">45 FPS on Jetson Orin</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-white">mAP@0.5</span> 
                    <span className="text-accent font-bold">96.8%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Call to Action -> Dev Log */}
      <section className="bg-[#030712] relative z-10" style={{ marginTop: '12rem', marginBottom: '12rem', paddingBottom: '4rem' }}>
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
