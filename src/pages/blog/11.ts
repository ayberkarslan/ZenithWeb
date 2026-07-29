export const log = {
  id: 11,
  tag: "Software",
  date: "July 26, 2026",
  title: "SITL Simulation: Bridging Gazebo and ArduPilot",
  shortDesc: "Integrating a hyper-realistic 3D simulation environment to safely validate node-based missions before live flights.",
  content: `### The Need for Risk-Free Validation
With a completely custom GCS generating complex, branching flight logic, testing directly on the hardware is far too risky. We needed a hyper-realistic simulation environment to validate our JSON task graphs and visual pipelines before the carbon fiber ever leaves the ground.

### Overcoming TCP/UDP Deadlocks
We integrated Gazebo 3D for physics and visual simulation, tied directly to ArduPilot SITL (Software In The Loop). The architecture was robust but challenging; we faced severe deadlock issues during high-frequency telemetry exchanges between ArduPilot (TCP) and Gazebo (UDP). By engineering a dynamic backoff and reconnect logic within our FastAPI backend, we stabilized the data pipeline and completely eliminated the network bottlenecks.

### Seamless Reality Transition
Our GCS now features a one-click toggle between SITL simulation and physical hardware. We can draw a mission on the node editor, watch the virtual drone execute it with precise physical responses in Gazebo, and once validated, deploy the exact same task graph to the real aircraft on the flight line. This tightly coupled software ecosystem provides us with unparalleled confidence during autonomous operations.`,
  status: "success",
  image: null
}
