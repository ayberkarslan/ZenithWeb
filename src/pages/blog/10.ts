export const log = {
  id: 10,
  tag: "Software",
  date: "July 25, 2026",
  title: "Building Drode: Our Fully Proprietary Node-Based GCS",
  shortDesc: "Retiring our legacy DOST architecture in favor of 'Drode'—our completely custom ReactFlow ground control ecosystem.",
  content: `### Retiring the DOST Architecture
During our previous campaigns at Teknofest, we relied heavily on "DOST"—a monolithic Python-based execution engine we developed for mission control. While DOST was highly functional for sequential tasks, it lacked the dynamic flexibility required for the complex, non-linear flight scenarios of SUAS 2026. Standard platforms like Mission Planner also felt too rigid to seamlessly integrate with our custom computer vision pipelines.

### Enter Drode (Drone + Node)
We decided to architect a completely proprietary Ground Control Station (GCS) from scratch using React, TypeScript, and Vite, which we named **Drode**. The core innovation of Drode is its Node-Based mission planner built on ReactFlow. Instead of executing raw coordinate lists, missions are now designed as visual flowcharts. We can simply drag and drop specific action nodes—Takeoff, Waypoint, Gimbal Control, and Shape Detection—and link them logically to create branching scenarios (e.g., "Scan Area A, if target not found, proceed to Area B").

### MAVLink Backend Bridge
To translate Drode's visual nodes into actionable flight commands, we developed a high-performance Python backend (Sirius) running on FastAPI. When a mission is deployed, the UI generates a JSON task graph. Our custom Task Graph Factory parses this and feeds it to the flight controller via pymavlink. Built-in telemetry loops run at high frequencies, featuring auto-reconnect algorithms to ensure we maintain absolute control, even during momentary radio link drops.`,
  status: "success",
  image: "/blog/drode_gcs.png"
}
