import { LucideIcon } from "lucide-react"; // Import the type for icons

// Type for individual device configurations
export interface DeviceConfig {
  label: string;
  icon: LucideIcon;
  color: string;
  height: number;
}

// ChartConfig type to include both desktop and mobile configurations
export interface ChartConfig {
  desktop: DeviceConfig;
  mobile: DeviceConfig;
}
