
<script lang="ts">
	import Input from "./Input.svelte";
	
	export let value: Date;
	let maskedValue: string = value.toLocaleDateString('en-GB');

	// function dateMask(input: string) {
	// 	let v = input.replace(/\D/g, '').slice(0, 8);

	// 	if (v.length >= 5) {
	// 		return `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`;
	// 	} else if (v.length >= 3) {
	// 		return `${v.slice(0, 2)}/${v.slice(2)}`;
	// 	}
		
	// 	return v;
	// }

	function dateMask(input: string) {
		let day = input.slice(0, 2);
		let month = input.slice(2, 4);
		let year = input.slice(4, 8);

		// Validate and adjust day
		if (day.length === 2) {
			const maxDays = getMaxDays(month, year);
			day = Math.min(Math.max(1, parseInt(day)), maxDays).toString().padStart(2, '0');
		}

		// Validate and adjust month
		if (month.length === 2) {
			month = Math.min(Math.max(1, parseInt(month)), 12).toString().padStart(2, '0');
		}

		// Validate and adjust year
		if (year.length === 4) {
			year = year.startsWith('2') ? year : '2000'; // Ensure the year starts with "2"
			year = Math.min(Math.max(2000, parseInt(year)), 2100).toString();
		}

		// Format the date string
		let formattedDate = day;
		if (month) formattedDate += '/' + month;
		if (year) formattedDate += '/' + year;

		return formattedDate;
	}

	function getMaxDays(month: string, year: string) {
		const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		
		if (month === '02' && isLeapYear(parseInt(year))) {
			return 29; // February has an extra day in leap years
		}
	
		return daysInMonth[parseInt(month) - 1] || 31; // Default to max days in the month
	}

	function isLeapYear(year: number) {
		return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
	}

	function convertToDate(dateString: string) {
		const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
		if (maskedValue.match(dateRegex)) {
			const [day, month, year] = dateString.split('/').map(Number);
			return new Date(year, month - 1, day);
		}
		
		return value;
	}

	$: {
		maskedValue,
		value = convertToDate(maskedValue);
	}
</script>

<Input type="text" bind:value="{maskedValue}" masks="{[dateMask]}" />