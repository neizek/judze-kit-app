<script lang="ts">
    import { getCurrentPosition, position } from '$lib/position';
    import FormItem from '../../../components/ui/FormItem.svelte';
    import Input from '../../../components/ui/Input.svelte';

	function dayOfTheYear(date: Date) {
		return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
	}

	function toRadians (angle: number) {
		return angle * (Math.PI / 180);
	}

	function toDegrees (radians: number) {
		return radians / (Math.PI / 180);
	}
	
	const today = new Date;
	let object: string;
	let latitude = $position ? $position.coords.latitude : 0;
	let longitude = $position? $position.coords.longitude : 0;

	// getCurrentPosition().then(location => {
	// 	latitude = location.coords.latitude;
	// 	longitude = location.coords.longitude;
	// });

	let declination = 0;
	let hourAngle = 0;
	let altitude = 0;
	let azimuth = 0;

	function calculateAzimuth() {

		switch(object) {
			case 'sun':
				declination = -23.45*Math.cos(toRadians(360/365*(dayOfTheYear(today)+10)));
				hourAngle = 15 * (today.getHours() - 12);
				altitude = Math.asin(Math.sin(toRadians(declination))*Math.sin(toRadians(latitude))+Math.cos(toRadians(declination))*Math.cos(toRadians(hourAngle)));
				azimuth = Math.acos((Math.sin(declination)-Math.sin(altitude)*Math.sin(latitude))/(Math.cos(altitude)*Math.cos(latitude)));
			break;
		}
	}
</script>

<div class="section-box">
	<FormItem label="UTC Time">
		<span>{today}</span>
	</FormItem>
	<FormItem label="Choose object">
		<select bind:value="{object}">
			<option value="sun">Sun</option>
			<option value="moon">Moon</option>
		</select>
	</FormItem>
	<FormItem label="Longitude">
		<Input type="number" bind:value="{longitude}" />
	</FormItem>
	<FormItem label="Latitude">
		<Input type="number" bind:value="{latitude}" />
	</FormItem>
	<button type="button" on:click={calculateAzimuth}>Calculate</button>
</div>
<div class="section-box">
	<div>
		<span>Declination:</span>
		<span>{declination}</span>
	</div>
	<div>
		<span>Hour angle:</span>
		<span>{hourAngle}</span>
	</div>
	<div>
		<span>Altitude:</span>
		<span>{toDegrees(altitude)}</span>
	</div>
	<div>
		<span>Azimuth</span>
		<span>{toDegrees(azimuth)}</span>
	</div>
</div>