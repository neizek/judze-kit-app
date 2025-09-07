export function formatToCompassError(number: number) {
	return `${Math.abs(number).toFixed(1)}° ${number >= 0 ? "E" : "W"}`;
}

export function formatToAngle(number: number) {
	return `${number.toFixed(1)}°`;
}

export function transformToCoordinates(number: number, direction: 'x' | 'y' | undefined = undefined) {
	const sign = (() => {
		if (!direction) {
			return '';
		}
		if (direction === 'y') {
			return number < 0 ? 'S' : 'N';
		} else {
			return number < 0 ? 'W' : 'E';
		}
	})();
	number = number > 0 ? number : -number;
	return `${Math.trunc(number)}°${((number - Math.floor(number)) * 60).toFixed(1)} ${sign}`;
}