export function formatToCompassError(number: number) {
	return `${Math.abs(number).toFixed(1)}° ${number >= 0 ? "E" : "W"}`;
}
