<script lang="ts">
    import { title } from "$lib/meta";
    import { getCurrentPosition } from "$lib/position";
    import Menu from "../components/widgets/Menu/Menu.svelte";

    const navTree = [
		{
			label: 'Navigation',
			items: [
				{label: 'Flags', icon: 'flag', link: 'navigation/flags'},
				{label: 'Sound Signals', icon: 'speaker', link: 'navigation/soundsignals'},
				{label: 'Lights', icon: 'lighthouse', link: 'navigation/lights'},
				{label: 'Shapes', icon: 'shapes', link: 'navigation/shapes'},
				{label: 'Buoys', icon: 'buoy', link: 'navigation/buoys'},
				{label: 'Rules', icon: 'books', link: 'navigation/rules'}
			]
		},
		{
			label: 'Weather & Celestial',
			items: [
				{label: 'Wind', icon: 'wind-rose', link: 'weather/wind'},
				{label: 'Clouds', icon: 'clouds', link: 'weather/clouds'},
				{label: 'Gyro Error', icon: 'compass', link: 'celestial/gyroerror'}
			]			
		},
		{
			label: 'Other',
			items: [
				{label: 'Donations', icon: 'money-with-wings-two', link: 'other/donate'}
			]
		}
	]

	getCurrentPosition();
	title.set('Judze');
</script>

<Menu navTree="{navTree}"/>
