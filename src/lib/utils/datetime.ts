import type { Duration } from "$lib/types/seaservice";

const oneDay = 24 * 60 * 60 * 1000;

export const formatDate = (datetime: string | Date) => 
	new Date(datetime).toLocaleDateString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'})

export const formatDateSimple = (datetime: Date) =>
	new Intl.DateTimeFormat('en-GB').format(datetime)

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

export function getDuration(startDate: Date, endDate: Date): Duration {
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