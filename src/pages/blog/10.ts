export const log = {
  id: 10,
  tag: "Software",
  date: "July 25, 2026",
  title: "Building \"Drode\": Our Fully Proprietary Node-Based GCS",
  shortDesc: "Evolving our DOST architecture by pairing it with \"Drode\"—our completely custom ReactFlow ground control ecosystem.",
  content: `### Evolving the DOST Architecture
During our previous campaigns at Teknofest, we relied heavily on "DOST"—our Python-based execution engine. While DOST was highly functional, its monolithic structure lacked the dynamic visual flexibility required for the complex, non-linear flight scenarios of SUAS 2026.

### Enter "Drode" (Drone + Node)
Instead of relying on rigid standard platforms like Mission Planner, we decided to build a completely proprietary Ground Control Station (GCS) frontend using React, TypeScript, and Vite, which we named **"Drode"**. The core innovation of "Drode" is its Node-Based mission planner built on ReactFlow. Missions are now designed as visual flowcharts. We can simply drag and drop specific action nodes—Takeoff, Waypoint, Gimbal Control, and Shape Detection—and link them logically to create branching scenarios.

### The "Drode" and DOST Bridge
To translate "Drode"'s visual nodes into actionable flight commands, we completely revamped our DOST Python backend, now running asynchronously on FastAPI. When a mission is deployed, the UI generates a JSON task graph. DOST parses this and feeds it to the flight controller via pymavlink. Built-in telemetry loops run at high frequencies, featuring auto-reconnect algorithms to ensure we maintain absolute control during autonomous flight.`,
  status: "success",
  image: "/blog/drode_gcs.png"
}
