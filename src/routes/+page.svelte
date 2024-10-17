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
				{label: 'Buoys', icon: 'buoy', link: 'navigation/buoys'},
				{label: 'Rules', icon: 'books', link: 'navigation/rules'}
			]
		},
		{
			label: 'Weather',
			items: [
				{label: 'Wind', icon: 'wind-rose', link: 'weather/wind'},
				{label: 'Clouds', icon: 'clouds', link: 'weather/clouds'}
			]			
		},
		{
			label: 'Celestial',
			items: [
				{label: 'Gyro Error', icon: 'wind-rose', link: 'celestial/gyroerror'},
			]			
		}
	]

	getCurrentPosition();
	title.set('Judze');
</script>

<Menu navTree="{navTree}"/>
