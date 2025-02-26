import { format } from "date-fns-jalali";
import faIR from "date-fns/locale/fa-IR";

export const formatDateTimeForServer = (date: Date | undefined): string => {
  if (!date) return "";
  return format(new Date(date), "yyyy-MM-dd HH:mm:ss", { locale: faIR });
};

export const formatSecondsToDate = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const newDate = new Date();
  newDate.setHours(hours, minutes, secs);

  return newDate;
};

export const formatDateToSeconds = (date: Date) => {
  const newDate = new Date(date);

  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const seconds = newDate.getSeconds();

  return hours * 60 * 60 + minutes * 60 + seconds;
};

export const convertSecondsToTime = (seconds: number) => {
  const h = seconds ? Math.floor(seconds / 3600) : 0;
  const m = seconds ? Math.floor((seconds % 3600) / 60) : 0;
  const s = seconds ? seconds % 60 : 0;

  return {
    hours: h.toString().padStart(2, "0"),
    minutes: m.toString().padStart(2, "0"),
    seconds: s.toString().padStart(2, "0"),
  };
};

export const formatTime = (time: any) => {
  let formattedTime = "";
  formattedTime += Number(time.hours) ? `${time.hours}` : "00";
  formattedTime += Number(time.minutes) ? `:${time.minutes}` : "00";
  formattedTime += Number(time.seconds) ? `:${time.seconds}` : "00";

  return formattedTime;
};

export function formatRemainingTime(totalSeconds: number) {
  // Calculate hours, minutes, and seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  // Format the output
  const formattedTime = [];
  if (hours > 0) {
    formattedTime.push(`${hours} ساعت`);
  }
  if (minutes > 0) {
    formattedTime.push(`${minutes} دقیقه`);
  }
  if (seconds > 0) {
    formattedTime.push(`${seconds} ثانیه`);
  }

  return formattedTime.join(", ");
}
