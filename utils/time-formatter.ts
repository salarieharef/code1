export function formatTime(time: string) {
	if (time) {
		let vid_time = time.split(".")[0];
		const [hours, minutes, seconds] = vid_time.split(":");

		const numericHours = parseInt(hours, 10);
		const numericMinutes = parseInt(minutes, 10);
		const numericSeconds = parseInt(seconds, 10);

		let output = "";
		if (numericHours > 0) {
			output += numericHours + " ساعت و ";
		}
		if (numericMinutes > 0) {
			output += numericMinutes + " دقیقه ";
		}
		if (numericSeconds > 0) {
			output += numericSeconds + " ثانیه";
		}

		return output;
	}
}

/**
 * Formats a date-time string by replacing "-" with "/" and ensuring the date comes before the time.
 *
 * @param dateTime - A date-time string in the format "YYYY-MM-DD HH:MM:SS"
 * @returns A formatted date-time string in the format "YYYY/MM/DD HH:MM:SS"
 */
export function formatDateTime(dateTime: string): string {
  // Replace "-" with "/"
  const replacedDateTime = dateTime?.replace(/-/g, "/");

  // Split the date and time
  const [date, time] = replacedDateTime?.split(" ");

  // Return the formatted date and time
  // const dateTime = "1403-02-31 15:31:08";
  // Outputs: "1403/02/31 15:31:08"
  return `${time} ${date}`;
}

//

export function fancyTimeFormat(time: number) {
	// Hours, minutes and seconds
	const hrs = ~~(time / 3600);
	const mins = ~~((time % 3600) / 60);
	const secs = ~~time % 60;

	// Output like "1:01" or "4:03:59" or "123:03:59"
	let ret = "";

	// if (hrs > 0) {
	ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
	// }

	ret += "" + mins + ":" + (secs < 10 ? "0" : "");
	ret += "" + secs;

	return ret;
}

export function videoTime(time: any) {
	if (time) {
		let vid_time = time.split(".")[0];
		const [hours, minutes, seconds] = vid_time.split(":");

		const numericHours = parseInt(hours);
		const numericMinutes = parseInt(minutes);
		const numericSeconds = parseInt(seconds);

		let output = [];
		if (numericHours > 0) {
			output.push(numericHours);
		} else {
			output.push("00");
		}
		if (numericMinutes > 0) {
			output.push(numericMinutes);
		} else {
			output.push("00");
		}
		if (numericSeconds > 0) {
			output.push(numericSeconds);
		} else {
			output.push("00");
		}

		return output.join(":");
	}
}

export function convertSecondsToHMS(totalSeconds: number) {
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	const timeFormat = `${hours.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

	return timeFormat;
}

export function convertDecimalSecondsToHMS(seconds: number) {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = Math.floor(seconds % 60);

	const timeFormat = `${hours.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;

	return timeFormat;
}

export function formatSeconds(seconds: number) {
	if (seconds) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const remainingSeconds = seconds % 60;

		let formattedTime = "";
		if (hours > 0) {
			formattedTime += hours + " ساعت ";
		}
		if (minutes > 0) {
			formattedTime += minutes + " دقیقه ";
		}
		if (remainingSeconds > 0) {
			formattedTime += remainingSeconds + " ثانیه";
		}

		return formattedTime;
	}
}

export function getTimeFromDate(dateStr: string): string {
	const dateObj = new Date(dateStr);
	const hours =
		dateObj.getHours() > 10 ? dateObj.getHours() : `0${dateObj.getHours()}`;
	const minutes =
		dateObj.getMinutes() > 10
			? dateObj.getMinutes()
			: `0${dateObj.getMinutes()}`;
	const seconds =
		dateObj.getSeconds() > 19
			? dateObj.getSeconds()
			: `0${dateObj.getSeconds()}`;

	return `${hours}:${minutes}:${seconds}`;
}
