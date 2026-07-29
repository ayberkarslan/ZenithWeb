export const log = {
  id: 14,
  tag: "Computer Vision",
  date: "July 17, 2026",
  title: "Dataset Fusion & TensorRT Optimization",
  shortDesc: "Building a custom hybrid dataset and optimizing our vision backbone with FP16 precision via TensorRT for the NVIDIA Jetson Orin Nano.",
  content: `### Building a Bulletproof Hybrid Dataset
To make sure our drone can consistently spot targets in unpredictable outdoor conditions, we couldn't just rely on standard, out-of-the-box data. Instead, we built a custom dataset by strategically fusing the Okutama-Action and VisDrone datasets. This gave us the perfect top-down, high-altitude perspective we need to mirror the competition field, while throwing enough background diversity at the model to proactively prevent domain shift.

Because a flying UAV has to deal with motion blur and partial occlusions, we aggressively expanded this blended data using HSV color jittering, mosaic scaling, perspective transforms, and synthetic noise insertion. After rigorously filtering and standardizing the bounding box annotations for our target classes, we locked in a highly balanced dataset ready to deliver high precision and recall during live competitive runs.

### Pushing the Jetson Orin Nano to the Limit 
Running complex vision models on the edge is always a strict trade-off between mean Average Precision (mAP) and computational throughput. To solve this, we heavily optimized our detection pipeline specifically for the NVIDIA Jetson Orin Nano. We utilized a lightweight, single stage detection backbone keeping the parameter overhead minimal while strictly preserving the high-resolution spatial features we need to detect tiny targets from high altitudes.

### FP16 Quantization & Deployment 
The real game changer was how we deployed it. We took our trained weights, applied FP16 precision quantization, and compiled the network through the TensorRT framework. This hardware aware setup perfectly exploits the Orin Nano’s Ampere GPU architecture. By maximizing parallel CUDA core utilization and optimizing memory bandwidth, we are now achieving ultra low inference latency and consistently high frame rates. Ultimately, this robust edge deployment gives us a massive tactical advantage in both speed and accuracy for dynamic mission scoring.`,
  status: "success",
  media: [
    { type: 'image', url: '/blog/tensorrt.jpeg' }
  ]
}
