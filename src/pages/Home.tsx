import { ArrowRight, Users, ChevronRight, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useThree, Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Environment, ContactShadows, useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import './Home.css'

// The real drone model from the team
function RealDrone() {
  const { scene } = useGLTF('/zifirDrone.glb')
  const droneRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (droneRef.current) {
      droneRef.current.rotation.y += 0.003 // Slow, elegant rotation
      // Faster landing animation from lower height
      droneRef.current.position.y = THREE.MathUtils.lerp(droneRef.current.position.y, 0, delta * 4)
    }
  })

  // Start at Y=4 for landing animation
  return (
    <group position={[0, 4, 0]} ref={droneRef}>
      <primitive object={scene} scale={13} />
    </group>
  )
}

function CameraOffset() {
  const { camera, size } = useThree()
  useEffect(() => {
    // Shift the camera view so the center (0,0,0) appears on the right
    camera.setViewOffset(size.width, size.height, -size.width * 0.18, 0, size.width, size.height)
    camera.updateProjectionMatrix()
    return () => {
      camera.clearViewOffset()
    }
  }, [camera, size])
  return null
}

function CameraResetter({ orbitRef }: { orbitRef: React.RefObject<any> }) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isResetting = useRef(false)
  const listenersAttached = useRef(false)
  const INITIAL_CAMERA_POSITION = new THREE.Vector3(0, 1.5, 6)
  const INITIAL_TARGET = new THREE.Vector3(0, -0.3, 0)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      // Note: Event listeners are attached to controls which are disposed on unmount anyway
    }
  }, [])

  useFrame((state, delta) => {
    const controls = orbitRef.current
    
    // Attach listeners once controls are available
    if (controls && !listenersAttached.current) {
      const handleStart = () => {
        isResetting.current = false
        if (timerRef.current) clearTimeout(timerRef.current)
      }

      const handleEnd = () => {
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
          isResetting.current = true
        }, 4000)
      }

      controls.addEventListener('start', handleStart)
      controls.addEventListener('end', handleEnd)
      listenersAttached.current = true
    }

    // Handle resetting animation
    if (isResetting.current && controls) {
      state.camera.position.lerp(INITIAL_CAMERA_POSITION, 2 * delta)
      controls.target.lerp(INITIAL_TARGET, 2 * delta)
      controls.update()
      
      if (
        state.camera.position.distanceTo(INITIAL_CAMERA_POSITION) < 0.01 &&
        controls.target.distanceTo(INITIAL_TARGET) < 0.01
      ) {
        isResetting.current = false
      }
    }
  })

  return null
}

// Preload the model so it doesn't pop in late
useGLTF.preload('/zifirDrone.glb')

export default function Home() {
  const orbitRef = useRef<any>(null)

  return (
    <div className="home relative">
      {/* Ambient Liquid Glass Background Element */}
      <div className="ambient-liquid-orb"></div>
      
      {/* Hero Section with 3D Canvas */}
      <section className="hero relative">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 1.5, 6], fov: 45 }} dpr={[1, 2]}>
            <CameraOffset />
            <ambientLight intensity={0.6} />
            <spotLight position={[5, 10, 5]} angle={0.25} penumbra={1} intensity={2} castShadow />
            

            <Float speed={2} rotationIntensity={0.1} floatIntensity={1.2}>
              <group position={[0, -0.3, 0]}>
                <RealDrone />
              </group>
            </Float>

            <ContactShadows position={[0, -1.5, 0]} opacity={0.9} scale={25} blur={2.5} far={4} color="#0A84FF" />
            <OrbitControls ref={orbitRef} enableZoom={false} maxPolarAngle={Math.PI / 1.5} target={[0, -0.3, 0]} />
            <CameraResetter orbitRef={orbitRef} />
            <Environment preset="city" />
          </Canvas>
        </div>

        <div className="hero-content-left">
          <div className="hero-text-block">
            <motion.h1 
              className="hero-title-2d"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              YTU<br/>
              <span className="text-accent">UASK</span>
            </motion.h1>
            <motion.p 
              className="hero-subtitle-2d"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              ROTARY WING UAV TEAM
            </motion.p>
            <motion.div 
              className="hero-actions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to="/vehicle-design" className="btn btn-primary">
                Discover our SUAS 2026 Drone <ArrowRight size={16} />
              </Link>
              <Link to="/dev-log" className="hero-link text-accent">
                Read Dev Logs <ChevronRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator - Absolute Bottom Center */}
        <motion.div 
          style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 50 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-accent cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <ChevronDown size={44} />
          </motion.div>
        </motion.div>
      </section>

      {/* Achievements Section */}
      <section className="section py-32 relative z-10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl text-center mb-16">Our <span className="text-accent">Achievements</span></h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              
              <div className="card hover:border-accent/50 transition-all group overflow-hidden flex flex-col cursor-default" style={{ padding: 0 }}>
                <div className="w-full h-72 overflow-hidden bg-black/20">
                  <img 
                    src="/teknofest.jpg" 
                    alt="Teknofest 2025 Finalist" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                </div>
                <div className="p-8">
                  <div className="text-accent font-bold tracking-widest uppercase text-sm mb-3">Teknofest 2025</div>
                  <h3 className="text-2xl mb-4 font-bold">International Free Mission UAV Finalist</h3>
                  <p className="text-muted leading-relaxed">
                    Selected as a finalist among hundreds of teams globally. We successfully demonstrated our cutting-edge rotary wing platform and autonomous AI capabilities on the grand stage, proving our engineering excellence.
                  </p>
                </div>
              </div>

              <div className="card hover:border-accent/50 transition-all group overflow-hidden flex flex-col cursor-default" style={{ padding: 0 }}>
                <div className="w-full h-72 overflow-hidden bg-black/20">
                  <img 
                    src="/teknofest.jpg" 
                    alt="Future Achievement" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                </div>
                <div className="p-8">
                  <div className="text-accent font-bold tracking-widest uppercase text-sm mb-3">SUAS 2026</div>
                  <h3 className="text-2xl mb-4 font-bold">Preparing for the Global Stage</h3>
                  <p className="text-muted leading-relaxed">
                    Building upon our success, we are heavily modifying our next-generation autonomous systems for the SUAS 2026 competition, focusing on precision payload delivery and real-time object detection.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="section bg-secondary relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="who-we-are-content">
              <h2 className="who-we-are-title">
                Meet the minds <br/>
                <span className="text-accent">behind the machine.</span>
              </h2>
              <p className="text-lg text-muted mt-6 mb-8">
                YTU Zenith is a team where talented students from different engineering disciplines come together to develop world-class UAV systems.
              </p>
              <Link to="/team" className="hero-link text-accent">
                Meet our team <ChevronRight size={18} />
              </Link>
            </div>
            
            <div className="who-we-are-visual">
              <img 
                src="/team-photo.jpg" 
                alt="YTU Zenith Team" 
                className="w-full object-cover border shadow-2xl" 
                style={{ aspectRatio: '4/5', borderRadius: '2rem', borderColor: 'var(--glass-border)' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="visual-placeholder glass hidden">
                <Users size={48} className="text-accent mb-4" />
                <span className="text-sm font-medium text-muted uppercase tracking-widest">Team Photo Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="mission-text">
              <h2 className="text-4xl mb-6">The SUAS 2026 Mission</h2>
              <p className="text-lg text-muted mb-6">
                Executing a fully autonomous flight demands precision at every level. From waypoint navigation and dynamic obstacle avoidance, down to centimeter-accurate payload airdrops.
              </p>
              <ul className="mission-list text-muted">
                <li><span className="text-accent">•</span> Autonomous Flight & Navigation</li>
                <li><span className="text-accent">•</span> AI-Powered Object Classification</li>
                <li><span className="text-accent">•</span> Precision Payload Delivery</li>
              </ul>
              <div className="mt-8">
                <Link to="/dev-log" className="hero-link text-accent font-bold">
                  Visit our SUAS Blog <ChevronRight size={18} />
                </Link>
              </div>
            </div>
            <div className="mission-visual">
              <img 
                src="/suas.png" 
                alt="SUAS 2026 Mission" 
                className="w-full object-cover border shadow-2xl" 
                style={{ aspectRatio: '4/3', borderRadius: '1.5rem', borderColor: 'var(--glass-border)' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="mission-image-placeholder hidden">
                <span className="text-muted text-sm">Interactive 3D Mission Viewer</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
