import split from "lodash-es/split";
import replace from "lodash-es/replace";

export function formatDate(date: string) {
  return replace(split(date, " ")[0], /\-/g, "/");
}
