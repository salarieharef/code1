# **Line Chart with Zoom and Export Options**

This project provides a customizable line chart component built using React and Recharts. The chart features zooming functionality and allows users to download the chart in various formats (PNG, SVG, CSV). The component is fully responsive and adapts to different screen sizes, ensuring a seamless experience on both desktop and mobile devices.

## **Table of Contents**

- [Installation](#installation)
- [Components](#components)
  - [WrapperLineChart](#wrapperlinechart)
  - [LineChartWithZoom](#linechartwithzoom)
  - [DownloadSelectChart](#downloadselectchart)
  - [ChartTooltip](#charttooltip)
  - [chartConfig](#chartconfig)
- [Usage](#usage)
- [Customization](#customization)
- [Exporting the Chart](#exporting-the-chart)
- [Contributing](#contributing)
- [License](#license)

## **Installation**

Before using these components, ensure you have Node.js and npm installed. Then, install the necessary dependencies:

```bash
npm install react recharts html-to-image 
```

## **Components**

### **WrapperLineChart**

This component wraps around the `LineChartWithZoom` component, handling data transformation, loading states, and rendering the chart or fallback UI.

#### **Props**

- `data`: The chart data in the required format.
- `name`: The name of the chart, used for labeling and tooltips.
- `loading`: A boolean indicating whether data is loading.
- `height`: The height of the chart.
- `label_chart`: Boolean to determine if the chart label should be displayed.
- `href`: The URL to navigate to when the action button is clicked.
- `textButton`: The text for the action button.
- `text_header`: The header text displayed when there is no data.
- `description_chart`: A description of the chart, typically displayed as the chart title.

#### **Usage Example**

```tsx
<WrapperLineChart
  data={chartData}
  name='بازدید'
  loading={statsIsLoading}
  href={"studio/advertising/create"}
  textButton={"ایجاد تبلیغ"}
  text_header={"شما هیچ تبلیغی را ایجاد نکرده‌اید"}
  description_chart={`آمار تبلیغات فعال در ${timestamp} روز گذشته`}
/>
```

### **LineChartWithZoom**

This component renders the actual line chart with zoom functionality. It also provides options to download the chart in PNG, SVG, and CSV formats.

#### **Props**

- `data`: An array of objects representing the chart data.
- `xAxisKey`: The key for the X-axis values in the data.
- `yAxisKey`: The key for the Y-axis values in the data.
- `lineSize`: The thickness of the line in the chart.
- `tickMargin`: The margin for the ticks.
- `tickCount`: The number of ticks displayed on the Y-axis.
- `showYAxisLine`: Boolean to show/hide the Y-axis line.
- `showGrid`: Boolean to show/hide the grid lines.
- `showYAxisGridLines`: Boolean to show/hide the Y-axis grid lines.
- `gridLineStyle`: The style of the grid lines (`solid` or `dashed`).
- `showYAxis`: Boolean to show/hide the Y-axis.
- `showYAxisTicks`: Boolean to show/hide the Y-axis ticks.
- `showXTicks`: Boolean to show/hide the X-axis ticks.
- `showDots`: Boolean to show/hide dots on data points.
- `tickXStyle`: Custom styles for the X-axis ticks.
- `tickYStyle`: Custom styles for the Y-axis ticks.
- `name`: The name of the chart, used for labeling and tooltips.

### **DownloadSelectChart**

This component provides a dropdown menu with options to download the chart in PNG, SVG, or CSV formats, as well as a button to reset the zoom level.

#### **Props**

- `isDownloadingSVG`: Boolean indicating if the SVG is currently being downloaded.
- `isDownloadingCSV`: Boolean indicating if the CSV is currently being downloaded.
- `downloadPNG`: Function to trigger PNG download.
- `downloadSVG`: Function to trigger SVG download.
- `downloadCSV`: Function to trigger CSV download.
- `zoomOut`: Function to reset the zoom level of the chart.

### **ChartTooltip**

A custom tooltip component used within the chart to display additional information about data points.

#### **Props**

- `active`: Boolean indicating if the tooltip is active.
- `payload`: The data to be displayed in the tooltip.
- `label`: The label for the tooltip (typically the X-axis value).
- `name`: The name to be displayed in the tooltip.

### **chartConfig**

This file contains the configuration settings for the chart, such as color schemes and dimensions for different screen sizes (desktop and mobile).

#### **Example Configuration**

```ts
export const chartConfig = {
  desktop: {
    label: "Desktop",
    icon: Monitor,
    color: "#60A5FA",
    height: 400,
  },
  mobile: {
    label: "Mobile",
    icon: Smartphone,
    color: "#60A5FA",
    height: 200,
  },
};
```

## **Usage**

To use these components, simply import and render the `WrapperLineChart` component with the appropriate props. Ensure that the data is in the correct format as expected by the chart.

### **Basic Example**

```tsx
import React from "react";
import WrapperLineChart from "./components/WrapperLineChart";

const App = () => {
  const chartData = [
    /* your data here */
  ];
  const statsIsLoading = false;

  return (
    <WrapperLineChart
      data={chartData}
      name='بازدید'
      loading={statsIsLoading}
      href={"studio/advertising/create"}
      textButton={"ایجاد تبلیغ"}
      text_header={"شما هیچ تبلیغی را ایجاد نکرده‌اید"}
      description_chart={`آمار تبلیغات فعال در ${timestamp} روز گذشته`}
    />
  );
};

export default App;
```

## **Customization**

The components are designed to be flexible and easily customizable. You can modify the styles, chart behavior, and export options to meet your specific needs. For example, you can change the color scheme by updating the `chartConfig` object.

## **Exporting the Chart**

Users can export the chart in different formats using the `DownloadSelectChart` component. This allows downloading:

- **PNG**: A raster image of the chart.
- **SVG**: A vector image of the chart.
- **CSV**: A CSV file containing the chart data.

To trigger a download, the corresponding function (`downloadPNG`, `downloadSVG`, or `downloadCSV`) is called.

### **Example of Triggering a Download**

```tsx
<DownloadSelectChart
  downloadPNG={downloadPNG}
  downloadSVG={downloadSVG}
  downloadCSV={downloadCSV}
  zoomOut={zoomOut}
/>
```

## **Contributing**

Contributions are welcome! Please ensure your code follows the established style and structure of the project. All contributions should be accompanied by tests and documentation where appropriate.

## **License**

This project is licensed under the MIT License. See the LICENSE file for more details.
