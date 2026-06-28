import { Cpu, Settings, Code, Video } from 'lucide-react'
import { motion } from 'framer-motion'
import './VehicleDesign.css'

export default function VehicleDesign() {
  return (
    <div className="pt-32 pb-24 container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl mb-4">Vehicle Design</h1>
        <p className="text-xl text-muted max-w-3xl mb-12">
          Documentation of our 2026 fully autonomous aerial system. Explore our engineering process across mechanical, electronics, and software disciplines.
        </p>

        <div className="design-grid">
          {/* Mechanical */}
          <section className="card design-section">
            <div className="design-header">
              <Settings className="text-accent" size={32} />
              <h2 className="text-3xl">Mechanical & Airframe</h2>
            </div>
            <p className="text-muted mt-4 mb-6">
              Our 2026 quadcopter frame is constructed utilizing lightweight carbon fiber tubing and 3D printed PETG mounts for optimal strength-to-weight ratio.
            </p>
            <div className="engineering-decision">
              <h3 className="font-bold mb-2">Engineering Decision: Why Carbon Fiber?</h3>
              <p className="text-sm text-muted">
                Early prototypes used aluminum, resulting in a frame weight of 1.2kg. Switching to 3K carbon fiber reduced airframe weight to 650g while increasing torsional rigidity by 40%, directly translating to 12 minutes of extra flight time.
              </p>
            </div>
            <div className="placeholder-media mt-6 flex items-center justify-center bg-secondary rounded-lg h-48 border border-border">
              <span className="text-muted text-sm">CAD Assembly View Placeholder</span>
            </div>
          </section>

          {/* Electronics */}
          <section className="card design-section">
            <div className="design-header">
              <Cpu className="text-accent" size={32} />
              <h2 className="text-3xl">Electronics & Power</h2>
            </div>
            <p className="text-muted mt-4 mb-6">
              Powered by a 6S 10,000mAh LiPo battery, our power distribution system ensures clean voltage regulation to the companion computer and flight controller.
            </p>
            <div className="engineering-decision">
              <h3 className="font-bold mb-2">Engineering Decision: Why Pixhawk Cube Orange?</h3>
              <p className="text-sm text-muted">
                The Cube Orange provides triple-redundant IMUs with internal heating. In our Week 3 high-wind tests, standard flight controllers suffered from vibration-induced drift. The isolated IMU on the Cube completely eliminated this issue.
              </p>
            </div>
            <div className="placeholder-media mt-6 flex items-center justify-center bg-secondary rounded-lg h-48 border border-border">
              <span className="text-muted text-sm">Power Distribution Schematic Placeholder</span>
            </div>
          </section>

          {/* Software */}
          <section className="card design-section md:col-span-2">
            <div className="design-header">
              <Code className="text-accent" size={32} />
              <h2 className="text-3xl">Software Architecture & AI</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mt-6">
              <div>
                <p className="text-muted mb-4">
                  We run ROS 2 on a Jetson Orin Nano companion computer. This handles all computer vision, state machine logic, and communicates with the PX4 flight controller via MicroXRCE-DDS.
                </p>
                <div className="engineering-decision">
                  <h3 className="font-bold mb-2">Engineering Decision: Why ROS 2 over ROS 1?</h3>
                  <p className="text-sm text-muted">
                    ROS 2's DDS middleware offers true real-time capabilities and lack of a single master node means no single point of failure during autonomous flight.
                  </p>
                </div>
              </div>
              <div className="placeholder-media flex items-center justify-center bg-secondary rounded-lg h-full min-h-[200px] border border-border">
                <span className="text-muted text-sm">ROS 2 Node Graph Diagram Placeholder</span>
              </div>
            </div>
          </section>
        </div>

        {/* Procedures & Videos */}
        <div className="mt-16">
          <h2 className="text-3xl mb-8">Instructional Procedures</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card procedure-card">
              <Video className="mb-4 text-accent" size={24} />
              <h3 className="font-bold text-xl mb-2">Pre-Flight Calibration</h3>
              <p className="text-sm text-muted mb-4">Step-by-step video guide on compass and magnetometer calibration at the flight line.</p>
              <a href="#" className="text-accent text-sm font-bold hover:underline">Watch Video &rarr;</a>
            </div>
            <div className="card procedure-card">
              <Video className="mb-4 text-accent" size={24} />
              <h3 className="font-bold text-xl mb-2">Payload Integration</h3>
              <p className="text-sm text-muted mb-4">How to properly load and secure the airdrop payload into the servo-release mechanism.</p>
              <a href="#" className="text-accent text-sm font-bold hover:underline">Watch Video &rarr;</a>
            </div>
            <div className="card procedure-card">
              <Video className="mb-4 text-accent" size={24} />
              <h3 className="font-bold text-xl mb-2">Failsafe Triggers</h3>
              <p className="text-sm text-muted mb-4">Demonstration of software and hardware manual override procedures during an emergency.</p>
              <a href="#" className="text-accent text-sm font-bold hover:underline">Watch Video &rarr;</a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
