"use client";
import { formatJalaliDate } from "@/utils/functions/transformDataToChartData";
import React, { useEffect, useRef, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toPng } from "html-to-image"; // Import the library
import { chartConfig } from "./chartConfig";
import ChartTooltip from "./ChartTooltip";
import DownloadSelectChart from "./DownloadSelectChart";
import { useMediaQuery } from "@/hooks/ui";

interface LineChartWithZoomProps {
  data: Array<{ name: string; cost: number; dateValue: number }>;
  xAxisKey: string;
  yAxisKey: string;
  lineSize: number;
  tickMargin: number;
  tickCount: number;
  showYAxisLine: boolean;
  showGrid: boolean;
  showYAxisGridLines?: boolean;
  gridLineStyle?: "solid" | "dashed";
  showYAxis?: boolean;
  showYAxisTicks?: boolean;
  showXTicks?: boolean;
  showDots?: boolean;
  tickXStyle?: any;
  tickYStyle?: any;
  name: string;
}

const getAxisYDomain = (
  data: Array<{ [key: string]: number | string }>,
  from: number,
  to: number,
  ref: string,
  offset: number
): [number, number] => {
  const refData = data.slice(from, to + 1);
  let [bottom, top] = [Number(refData[0][ref]), Number(refData[0][ref])];
  refData.forEach((d) => {
    if (Number(d[ref]) > top) top = Number(d[ref]);
    if (Number(d[ref]) < bottom) bottom = Number(d[ref]);
  });

  bottom = Math.max(bottom, 0);

  return [(bottom | 0) - offset, (top | 0) + offset];
};

const LineChartWithZoom: React.FC<LineChartWithZoomProps> = ({
  data,
  xAxisKey,
  yAxisKey,
  lineSize,
  tickMargin,
  tickCount,
  showYAxisLine,
  showGrid,
  showYAxisGridLines = true,
  gridLineStyle = "dashed",
  showYAxis = true,
  showYAxisTicks = true,
  showDots = true,
  showXTicks = true,
  tickXStyle,
  tickYStyle,
  name,
}) => {
  const [state, setState] = useState<any>({
    left: "dataMin",
    right: "dataMax",
    refAreaLeft: "",
    refAreaRight: "",
    top: "dataMax+1",
    bottom: 0,
  });

  const [isDownloadingSVG, setDownloadingSVG] = useState(false);
  const [isDownloadingCSV, setDownloadingCSV] = useState(false);

  const chartRef = useRef<HTMLDivElement>(null); // Ref to the chart container

  const isMobile = useMediaQuery("(max-width: 768px)");

  const zoom = () => {
    let { refAreaLeft, refAreaRight } = state;

    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      setState((prevState: any) => ({
        ...prevState,
        refAreaLeft: "",
        refAreaRight: "",
      }));
      return;
    }

    if (refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    const fromIndex = data.findIndex((d) => d.dateValue === refAreaLeft);
    const toIndex = data.findIndex((d) => d.dateValue === refAreaRight);

    if (fromIndex < 0 || toIndex < 0 || fromIndex > toIndex) {
      setState((prevState: any) => ({
        ...prevState,
        refAreaLeft: "",
        refAreaRight: "",
      }));
      return;
    }

    const [bottom, top] = getAxisYDomain(data, fromIndex, toIndex, yAxisKey, 1);

    setState((prevState: any) => ({
      ...prevState,
      refAreaLeft: "",
      refAreaRight: "",
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
    }));
  };

  const zoomOut = () => {
    setState({
      refAreaLeft: "",
      refAreaRight: "",
      left: "dataMin",
      right: "dataMax",
      top: "dataMax+1",
      bottom: 0,
    });
  };

  const downloadSVG = () => {
    setDownloadingSVG(true);
    const svgElement = chartRef.current?.querySelector("svg");
    if (svgElement) {
      const serializer = new XMLSerializer();
      const svgBlob = new Blob([serializer.serializeToString(svgElement)], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(svgBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "chart.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
    setDownloadingSVG(false);
  };

  const downloadPNG = async () => {
    if (chartRef.current) {
      const dataUrl = await toPng(chartRef.current); // Convert the chart to PNG
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "chart.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const downloadCSV = () => {
    setDownloadingCSV(true);

    const headers = ["dateValue", "cost"];

    const csvRows = data.map((row: any) =>
      headers
        .map((header) =>
          header === "dateValue" ? formatJalaliDate(row[header]) : row[header]
        )
        .join(",")
    );

    csvRows.unshift(headers.join(","));

    const csvContent = csvRows.join("\n");

    const link = document.createElement("a");
    link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`;
    link.download = "chart.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadingCSV(false);
  };

  const { left, right, refAreaLeft, refAreaRight, top, bottom } = state;

  const currentConfig = isMobile ? chartConfig.mobile : chartConfig.desktop;

  return (
    <div className='w-full'>
      <DownloadSelectChart
        isDownloadingSVG={isDownloadingSVG}
        isDownloadingCSV={isDownloadingCSV}
        // isLoading={isLoading}
        downloadPNG={downloadPNG}
        downloadSVG={downloadSVG}
        downloadCSV={downloadCSV}
        zoomOut={zoomOut}
      />

      <div className='select-none'>
        <div>
          {" "}
          {/* Ref to the entire chart container */}
          <ResponsiveContainer
            className='w-full'
            height={currentConfig.height}
            minWidth={270}
            ref={chartRef}
          >
            <RechartsLineChart
              data={data}
              onMouseDown={(e: any) =>
                setState({ ...state, refAreaLeft: e.activeLabel })
              }
              onMouseMove={(e: any) =>
                refAreaLeft &&
                setState({ ...state, refAreaRight: e.activeLabel })
              }
              onMouseUp={zoom}
            >
              {showGrid && (
                <CartesianGrid
                  strokeDasharray={gridLineStyle === "solid" ? "0" : "3 3"}
                  vertical={false}
                  horizontal={showYAxisGridLines}
                  stroke='#AEAEAE'
                  strokeOpacity={showYAxisGridLines ? 1 : 0}
                />
              )}
              <XAxis
                allowDataOverflow
                dataKey={xAxisKey}
                domain={[left, right]}
                type='number'
                tickFormatter={(tick) => formatJalaliDate(tick)}
                tickLine={showXTicks}
                tick={{ ...tickXStyle }}
              />
              <YAxis
                tickMargin={tickMargin}
                tickCount={5}
                axisLine={false}
                tickLine={false}
                allowDataOverflow
                domain={[bottom, top]}
                tickFormatter={() => ""}
                type='number'
              />
              <Tooltip content={<ChartTooltip name={name} />} />
              <Line
                type='linear'
                dataKey={yAxisKey}
                stroke={currentConfig.color}
                strokeWidth={lineSize}
                animationDuration={300}
                dot={(props) => {
                  const { cx, cy } = props;
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={3}
                      fill='blue'
                      stroke='black'
                      strokeWidth={2}
                    />
                  );
                }}
              />
              {refAreaLeft && refAreaRight ? (
                <ReferenceArea
                  x1={refAreaLeft}
                  x2={refAreaRight}
                  strokeOpacity={0.3}
                />
              ) : null}
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LineChartWithZoom;
