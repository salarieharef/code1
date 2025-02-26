import jalaali from "jalaali-js";

import replace from "lodash-es/replace";

export const replaceDate = (date?: string) => {
  if (!date) return "";
  return replace(new Date(date).toLocaleDateString("fa-IR"), /\//g, "-");
};

export const replaceDateEn = (shamsiDate: string) => {
  if (!shamsiDate || !shamsiDate.includes(" ") || !shamsiDate.includes("-")) {
    return new Date(); // return current date as default
  }

  const [jYear, jMonth, jDay] = shamsiDate.split(" ")[0].split("-").map(Number);

  const { gy, gm, gd } = jalaali.toGregorian(jYear, jMonth, jDay);
  return new Date(gy, gm - 1, gd);
};
export const replaceDateByHourEn = (shamsiDate: string) => {
  if (!shamsiDate || !shamsiDate.includes(" ") || !shamsiDate.includes("-")) {
    return new Date(); // return current date as default
  }

  const [year, month, day] = shamsiDate.split(" ")[0].split("-").map(Number);
  const [hour, minute, second] = shamsiDate
    .split(" ")[1]
    .split(":")
    .map(Number);

  const { gy, gm, gd } = jalaali.toGregorian(year, month, day);
  return new Date(gy, gm - 1, gd, hour, minute, second);
};

export const formatDate = (value: any) => {
  const date = new Date(value);
  if (isNaN(date.getTime())) return "Invalid date";
  const { jy, jm, jd } = jalaali.toJalaali(date);
  return `${jy}/${jm.toString().padStart(2, "0")}/${jd.toString().padStart(2, "0")}`;
};

export const formatDateForServer = (date: Date) => {
  return replace(
    new Date(date).toLocaleDateString("fa-IR").replace(/\//g, "-") +
      " " +
      new Date(date).toLocaleTimeString("fa-IR", {
        hour12: false,
      }),
    /\//g,
    "-"
  );
};

export const convertShamsiToGregorian = (shamsiDate: string) => {
  if (!shamsiDate || !shamsiDate.includes(" ") || !shamsiDate.includes("-")) {
    return new Date(); // return current date as default
  }

  const [jYear, jMonth, jDay] = shamsiDate.split(" ")[0].split("-").map(Number);

  const { gy, gm, gd } = jalaali.toGregorian(jYear, jMonth, jDay);
  return new Date(gy, gm - 1, gd);
};
