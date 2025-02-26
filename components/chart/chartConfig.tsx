// chartConfig.ts

import { ChartConfig } from "@/types/chart";
import { Monitor, Smartphone } from "lucide-react"; // Import icons

// Define the chart configuration
export const chartConfig: ChartConfig = {
  desktop: {
    label: "Desktop",
    icon: Monitor,
    color: "#60A5FA", // Example color
    height: 400, // Height for desktop
  },
  mobile: {
    label: "Mobile",
    icon: Smartphone,
    color: "#60A5FA", // Example color
    height: 200, // Height for mobile4
  },
};
