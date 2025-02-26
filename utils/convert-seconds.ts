export default function convertTimeValue(value: number, unit: string) {
  switch (unit) {
    case "minute":
      return value * 60;
    case "hour":
      return value * 3600;
    case "day":
      return value * 86400;
    case "week":
      return value * 604800;
    default:
      return value;
  }
}
