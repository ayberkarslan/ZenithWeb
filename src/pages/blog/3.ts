export const log = {
  id: 3,
  tag: "Hardware",
  date: "April 22, 2026",
  title: "Motor Vibration & Compass Drift Issue",
  shortDesc: "Identified and fixed severe compass variance caused by arm resonance.",
  content: "### Problem\nDuring hover tests, EKF2 reported severe compass variance. The drone entered failsafe mode and initiated an emergency landing.\n\n### Analysis\nFFT data from the blackbox indicated excessive vibrations at 80Hz reaching the flight controller. The 3K carbon fiber arms were resonating exactly at the hover RPM.\n\n### Solution\nWe redesigned the motor mounts to include TPU isolation dampers, decoupling the high-frequency vibrations from the frame. We also moved the GPS/Compass module to a 15cm mast to reduce electromagnetic interference from the high-current ESC wires.",
  status: "failure",
  image: "/log-motor.jpg"
}
