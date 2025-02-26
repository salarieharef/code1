import { Skeleton } from "@/components/ui/skeleton-loading";
import { chartData } from "@/utils/functions/transformDataToChartData";
import { Button } from "../ui/button";
import LineChartWithZoom from "./LineChartWithZoom";
import NoImg from "@/static/icons/nothing.svg";

const WrapperLineChart = ({
  data,
  name,
  loading,
  label_chart = true,
  href,
  textButton,
  text_header,
  description_chart,
}: any) => {
  if (loading) {
    return <Skeleton className='h-96 w-full' />;
  }

  if (!data || !data.x_data || !data.y_data) {
    console.error("Invalid data passed to WrapperLineChart:", { data });
    return <p>در خواست دیتا با مشکل مواجه شد</p>; // or you can return some fallback UI
  }

  const chartDataConvert: any = chartData({ chart: data }, name);

  // Filter out invalid values from y_data
  const validYData = data.y_data.filter(
    (value: any) => typeof value === "number" && !isNaN(value)
  );

  // Find the maximum y value from the chart data
  const maxYValue = validYData.length ? Math.max(...validYData) : 0;

  return (
    <div className='rounded-xl bg-muted px-2 py-6'>
      {maxYValue > 0 ? (
        <>
          {label_chart ? (
            <h2 className='mt-6 text-center text-lg font-bold md:text-xl'>
              {description_chart}
            </h2>
          ) : (
            <></>
          )}
          <LineChartWithZoom
            data={chartDataConvert} // Data for the chart
            xAxisKey='dateValue' // Key for the X-axis values
            yAxisKey='cost' // Key for the Y-axis values
            lineSize={4} // Size/thickness of the line
            tickMargin={20} // Margin for the ticks
            tickCount={5} // Number of ticks, dynamic based on data
            showYAxisLine={false} // Whether to show Y-axis line
            showGrid={true} // Whether to show grid lines
            showYAxisGridLines={true} // Whether to show Y-axis grid lines
            gridLineStyle='solid' // Style of grid lines
            showYAxis={true} // Whether to show Y-axis
            showYAxisTicks={false} // Whether to show Y-axis ticks
            showXTicks={false} // Whether to show X-axis ticks
            showDots={true} // Whether to show dots on data points
            tickXStyle={{
              fontSize: 14,
              fontWeight: "normal",
              fill: "#000",
              dy: 15,
            }} // Style for X-axis ticks
            tickYStyle={{
              fontSize: 14,
              fontWeight: "normal",
              fill: "#000",
              dx: -10,
            }} // Style for Y-axis ticks
            name={name} // Pass the name prop for dynamic tooltip title
          />
        </>
      ) : (
        <>
          <div className='my-32 flex flex-col items-center justify-center gap-2'>
            <NoImg className='size-24 fill-blue-500' />
            <h4 className='text-center text-lg md:text-xl'>{text_header}</h4>
            <div>
              <Button className='w-52 py-1 text-lg md:w-72' href={href}>
                {textButton}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WrapperLineChart;
