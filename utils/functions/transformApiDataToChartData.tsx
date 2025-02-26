// export const transformApiDataToChartData = (apiData: any) => {
//   const { x_data, y_data } = apiData.chart;
//   return x_data.map((x: string, index: number) => ({
//     date: x,
//     views: y_data[index],
//   }));
// };

import moment from "moment-jalaali";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: false });

export const transformApiDataToChartData = (apiData: any) => {
  const { x_data, y_data } = apiData.chart;

  return x_data.map((x: string, index: number) => {
    //shamsi to day and month
    const date = moment(x, "jYYYY-jMM-jDD").format("jD jMMMM");
    return {
      date,
      views: y_data[index],
    };
  });
};
