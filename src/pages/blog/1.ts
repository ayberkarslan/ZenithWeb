export const log = {
  id: 1,
  tag: "Avionics",
  date: "May 15, 2026",
  title: "Autonomous Waypoint Mission Success",
  shortDesc: "Tuned L1 navigation controller parameters for heavier payloads, resulting in successful autonomous flight.",
  content: "### Problem\nPrevious flights resulted in 2-3 meter cross-track error in high winds. The drone struggled to maintain a straight line between distant waypoints.\n\n### Analysis\nLog analysis via PX4 showed the L1 navigation controller parameters were tuned too aggressively for our new heavier payload. The excessive overshoot was a classic sign of underdamping.\n\n### Solution & Lessons Learned\nReduced nav_l1_period to 12.0s and increased nav_l1_damping to 0.85. The vehicle now smoothly tracks lines even with 15-knot gusts. We learned that payload mass drastically changes aerodynamic damping requirements.",
  status: "success",
  image: null
}
