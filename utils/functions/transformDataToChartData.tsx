import moment from "moment-jalaali";

export const parseJalaliDate = (dateString: string): number => {
  return moment(dateString, "jYYYY/jMM/jDD").valueOf(); // Parse Jalali date to timestamp
};

export const formatJalaliDate = (timestamp: number): string => {
  return moment(timestamp).format("jYYYY/jMM/jDD"); // Format timestamp to Jalali date
};

export const chartData = (data: any, nameKey: string) => {
  return data?.chart?.x_data?.map((date: any, index: any): any => ({
    name: data?.chart?.x_data, // Dynamic name from props
    dateValue: parseJalaliDate(date), // Parsed date value
    cost: data?.chart?.y_data[index], // Corresponding Y-axis value
  }));
};
