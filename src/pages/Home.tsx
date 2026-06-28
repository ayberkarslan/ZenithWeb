import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Float, Environment, ContactShadows, useGLTF, Text3D } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import './Home.css'

function RealDrone() {
  const { scene } = useGLTF('/zifirDrone.glb')
  const droneRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (droneRef.current) {
      droneRef.current.rotation.y += 0.003
    }
  })

  return (
    <group position={[3.2, -0.5, 0]} ref={droneRef}>
      <primitive object={scene} scale={10} />
    </group>
  )
}

useGLTF.preload('/zifirDrone.glb')

function CameraRig() {
  const { camera } = useThree()
  const controlsRef = useRef<any>(null)
  const timeoutRef = useRef<number | null>(null)
  const isInteracting = useRef(false)
  const isInitial = useRef(true)

  const defaultPos = new THREE.Vector3(0, 1.5, 6)
  const defaultTarget = new THREE.Vector3(0, 0, 0)

  useFrame((state, delta) => {
    if (!isInteracting.current && timeoutRef.current === null && !isInitial.current) {
      camera.position.lerp(defaultPos, 2 * delta)
      if (controlsRef.current) {
        controlsRef.current.target.lerp(defaultTarget, 2 * delta)
        controlsRef.current.update()
      }
    }
  })

  useEffect(() => {
    const handleStart = () => {
      isInteracting.current = true
      isInitial.current = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }

    const handleEnd = () => {
      isInteracting.current = false
      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null
      }, 4000)
    }

    const controls = controlsRef.current
    if (controls) {
      controls.addEventListener('start', handleStart)
      controls.addEventListener('end', handleEnd)
    }

    return () => {
      if (controls) {
        controls.removeEventListener('start', handleStart)
        controls.removeEventListener('end', handleEnd)
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return <OrbitControls ref={controlsRef} enableZoom={false} maxPolarAngle={Math.PI / 1.5} />
}

export default function Home() {
  return (
    <div className="home relative">
      <div className="ambient-liquid-orb"></div>
      
      <section className="hero relative">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 1.5, 6], fov: 45 }} dpr={[1, 2]}>
            <ambientLight intensity={0.6} />
            <spotLight position={[5, 10, 5]} angle={0.25} penumbra={1} intensity={2} castShadow />
            
            <Float speed={1.5} rotationIntensity={0} floatIntensity={0.8}>
              <group position={[-4.5, 0.5, 0]} rotation={[0, 0.15, 0]}>
                <Text3D font="/font.json" size={0.9} height={0.2} curveSegments={12} bevelEnabled bevelThickness={0.02} bevelSize={0.02}>
                  YTU
                  <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.1} />
                </Text3D>
                <Text3D font="/font.json" size={0.9} height={0.2} position={[0, -1.1, 0]} curveSegments={12} bevelEnabled bevelThickness={0.02} bevelSize={0.02}>
                  ZENITH
                  <meshStandardMaterial color="#0A84FF" metalness={0.8} roughness={0.1} />
                </Text3D>
                <Text3D font="/font.json" size={0.25} height={0.05} position={[0.05, -1.7, 0]} curveSegments={12}>
                  PIONEERING AUTONOMOUS FLIGHT
                  <meshStandardMaterial color="#888888" metalness={0.5} roughness={0.5} />
                </Text3D>
              </group>
            </Float>

            <Float speed={2} rotationIntensity={0.1} floatIntensity={1.2}>
              <RealDrone />
            </Float>

            <ContactShadows position={[0, -1.5, 0]} opacity={0.9} scale={25} blur={2.5} far={4} color="#0A84FF" />
            
            <CameraRig />
            <Environment preset="city" />
          </Canvas>
        </div>

        <div className="container hero-content-left relative z-10 pointer-events-none">
          <motion.div 
            className="hero-actions pointer-events-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to="/dev-log" className="btn btn-primary">
              Read Dev Logs <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
