export const log = {
  id: 8,
  tag: "Avionics",
  date: "July 12, 2026",
  title: "12S Power Integration and CoG Balancing",
  shortDesc: "Wiring our dual 6S batteries in series for a 12S high-voltage system using the Matek PDB-HEX.",
  content: `### High-Voltage Series Configuration
To power the system with maximum efficiency, we integrated our two 6S 30,000mAh Profuse Solid-State batteries in series. This creates a formidable 12S (44.4V) high-voltage power system while maintaining the 30,000mAh capacity. Solid-state technology provides significant savings in battery volume due to its extreme high energy density, and its thermally stable, liquid-electrolyte-free structure completely eliminates the risk of fire in the event of a crash.

### Power Distribution and CoG
Managing this immense power requires a highly reliable distribution network. We are routing this 12S system through a clean power distribution layout created with the **Matek PDB-HEX** board. This endurance-focused, compact, and safe infrastructure comfortably provides the extended flight time required for the SUAS mission. Finally, we securely strapped the batteries dead center on the top deck, perfectly aligning them with the drone's vertical axis to ensure absolute Center of Gravity (CoG) stability.`,
  status: "success",
  image: "/blog/battery_mount.jpg"
}
