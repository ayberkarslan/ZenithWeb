export const log = {
  id: 10,
  tag: "Software",
  date: "July 25, 2026",
  title: "Evolution of the GCS: From Python Scripts to Node-Based Architecture",
  shortDesc: "Deprecating our legacy Teknofest Python engine in favor of a modern, visual ReactFlow ground control station.",
  content: `### Outgrowing the Legacy Engine
During our previous campaigns at Teknofest, we relied heavily on a monolithic Python script engine for mission execution. While functional, it lacked the dynamic flexibility required for the complex, non-linear flight scenarios of SUAS 2026. Standard platforms like Mission Planner and QGroundControl also felt too rigid to seamlessly integrate with our custom computer vision pipelines.

### The ReactFlow Node Architecture
We decided to architect our own Ground Control Station (GCS) from scratch using React, TypeScript, and Vite. The core innovation is our Node-Based mission planner built on ReactFlow. Instead of executing raw coordinate lists, missions are now designed as visual flowcharts. We can simply drag and drop specific action nodes—Takeoff, Waypoint, Gimbal Control, and Shape Detection—and link them logically to create branching scenarios (e.g., "Scan Area A, if target not found, proceed to Area B").

### MAVLink Backend Bridge
To translate these visual nodes into actionable flight commands, we developed a high-performance Python backend (Sirius) running on FastAPI and Uvicorn. When a mission is deployed, the UI generates a JSON task graph. Our custom Task Graph Factory parses this and feeds it to the flight controller via pymavlink. Built-in telemetry loops run at high frequencies, featuring auto-reconnect algorithms to ensure we maintain absolute control, even during momentary radio link drops.`,
  status: "success",
  image: null
}
