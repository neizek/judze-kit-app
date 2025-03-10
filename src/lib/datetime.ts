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