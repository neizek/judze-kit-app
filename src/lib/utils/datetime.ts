import type { DurationParams } from "$lib/types/seaservice";

export const oneDay = 24 * 60 * 60 * 1000;
export const oneWeek = oneDay * 7;
export const oneMonth = oneDay * 30;

const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

export const formatDate = (datetime: string | Date) => 
	new Date(datetime).toLocaleDateString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'})

export const formatDateSimple = (datetime: Date) =>
	new Intl.DateTimeFormat('en-GB').format(datetime)

export const formatDateSimpleWithTime = (datetime: Date) =>
	new Intl.DateTimeFormat('en-GB', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	}).format(datetime);

export const getOneWeekAgo = (datetime: Date) =>
	new Date(datetime.setDate(datetime.getDate() - 7))

export const getOneWeekLater = (datetime: Date) => {
	const newDate = new Date(datetime.getTime());
	newDate.setDate(newDate.getDate() + 7);
	return newDate;
}

export const getTwoYearsLater = (datetime: Date) => 
	new Date(new Date(datetime).setFullYear(datetime.getFullYear() + 2))

export const getTwoYearsAgo = (datetime: Date) => 
	new Date(new Date(datetime).setFullYear(datetime.getFullYear() - 2))

export function convertDateToUTC(datetime: Date) { 
	return new Date(datetime.getUTCFullYear(), datetime.getUTCMonth(), datetime.getUTCDate(), datetime.getUTCHours(), datetime.getUTCMinutes(), datetime.getUTCSeconds()); 
}

export function getDaysBetweenDates(startDate: Date, endDate: Date) {
	return Math.round(Math.abs((Number(endDate) - Number(startDate)) / oneDay));
}

// Returns duration between two dates in {years, months, days} format
export function getDuration(startDate: Date, endDate: Date): DurationParams {
	if (startDate > endDate) {
		[startDate, endDate] = [endDate, startDate];
	}

	let years = endDate.getFullYear() - startDate.getFullYear();
	let months = endDate.getMonth() - startDate.getMonth();
	let days = endDate.getDate() - startDate.getDate();

	if (days < 0) {
		months--;
		let previousMonthDays = new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
		days += previousMonthDays;
	}

	if (months < 0) {
		years--;
		months += 12;
	}

	return {years, months, days}
}

export function sumDurations(durations: DurationParams[]): DurationParams {
	let years = 0;
	let months = 0;
	let days = 0;

	for (const duration of durations) {
		years += duration.years;
		months += duration.months;
		days += duration.days;
	}

	if (days >= 30) {
		months += Math.floor(days / 30);
		days = days % 30;
	}
	
	if (months >= 12) {
		years += Math.floor(months / 12);
		months = months % 12;
	}

	return { years, months, days };
}

export function getTimeFromDate(datetime: Date) {
	if (!(datetime instanceof Date)) {
		return '';
	}

	return datetime.toISOString().substr(11, 8);
}

export function dateToExcelSerial(date: Date) {
	const excelBaseDate = new Date(Date.UTC(1900, 0, 1));
	const timeDifference = Number(date) - Number(excelBaseDate);
	return Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 2;
}

/* Date reviver for parsing */
export function dateReviver(key: string, value: any) {
  if (typeof value === "string" && dateRegex.test(value)) {
    return new Date(value);
  }
  return value;
}
