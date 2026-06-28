export const log = {
  id: 4,
  tag: "Hardware",
  date: "June 25, 2026",
  title: "YOLO API Test",
  shortDesc: "We tested our custom-trained YOLO model on our drone prototype.",
content: `### Problem
During hover tests, EKF2 reported severe compass variance. The drone entered failsafe mode and initiated an emergency landing.

### Analysis
FFT data from the blackbox indicated excessive vibrations at 80Hz reaching the flight controller. The 3K carbon fiber arms were resonating exactly at the hover RPM.

### Solution
We redesigned the motor mounts to include TPU isolation dampers, decoupling the high-frequency vibrations from the frame. We also moved the GPS/Compass module to a 15cm mast to reduce electromagnetic interference from the high-current ESC wires.`,  status: "failure",
  image: "/yolo_blog.jpg"
}
