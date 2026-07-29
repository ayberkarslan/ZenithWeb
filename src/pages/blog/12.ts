export const log = {
  id: 12,
  tag: "Hardware",
  date: "July 13, 2026",
  title: "Flight Testing: Landing Gear Redesign",
  shortDesc: "A harsh landing during initial flight tests revealed structural weaknesses, prompting a complete redesign of the landing gear.",
  content: `### The Initial Flight Attempt
Moving from simulation to the real world is always a humbling experience. During our initial hover tests, the drone performed flawlessly in the air. However, upon landing, the drone experienced a catastrophic tip over due to inadequate shock absorption and a narrow stance on the original landing gear.

### Engineering a Solution
The crash provided invaluable data. The original legs were too rigid and tall, shifting the Center of Gravity too high during touchdown impacts. We immediately returned to the lab and designed a completely new, wider stance landing gear system with progressive dampening. This new topology ensures that lateral forces during a rough landing are absorbed rather than tipping the entire aircraft over.`,
  status: "warning",
  media: [
    { type: 'video', url: '/blog/crash.mp4', sound: false }
  ]
}
