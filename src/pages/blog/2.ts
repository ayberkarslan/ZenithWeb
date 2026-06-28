export const log = {
  id: 2,
  tag: "Computer Vision",
  date: "May 02, 2026",
  title: "Real-time Object Detection Integration",
  shortDesc: "Deployed YOLOv8 on Jetson Orin NX for real-time target acquisition.",
  content: "### The Challenge\nThe SUAS mission requires us to detect and classify alphanumeric targets on the ground from 100+ feet in the air, in real time.\n\n### Implementation\nWe integrated a custom-trained YOLOv8 model running on an onboard NVIDIA Jetson Orin NX. The telemetry overlay is fused directly with the camera feed to geolocate the targets.\n\n### Results\nInference time is down to 12ms. Accuracy is hovering around 94% on test datasets. We're very confident in this pipeline.",
  status: "success",
  image: "/log-cv.jpg"
}
