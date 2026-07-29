export const log = {
  id: 5,
  tag: "Hardware",
  date: "June 30, 2026",
  title: "Core Airframe Assembly: 3K Carbon Fiber Topology",
  shortDesc: "Assembling the central plates of HEYULA's chassis with a focus on minimizing harmonic resonance.",
  content: `### Structural Foundations
The foundation of any autonomous UAV is its mechanical rigidity. Today, the team began the core assembly of HEYULA's central frame using precision cut 3K carbon fiber plates. 

### Minimizing Harmonic Resonance
By securely bolting the top and bottom plates around the central avionics bay, we create an incredibly stiff structure. This rigidity is absolutely critical; any flex in the frame would introduce harmonic vibrations that could confuse the Pixhawk's IMU and gyro sensors. The carbon fiber ensures that the frame absorbs micro vibrations rather than transmitting them.`,
  status: "success",
  media: [
    { type: 'image', url: '/blog/frame_assembly.jpg' },
    { type: 'video', url: '/blog/assembly.mov', sound: false }
  ]
}
