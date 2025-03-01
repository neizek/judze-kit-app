<script lang="ts">
    import { title } from "$lib/meta";
//   import CircleDiagram from "../components/ui/CircleDiagram.svelte";
//   import EqualGrid from "../components/ui/EqualGrid.svelte";
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
				{label: 'Distress Signals', icon: 'lifebuoy', link: 'other/distress'},
				{label: 'Chimes', icon: 'chime', link: 'other/chime'}
			]
		}
	]

	title.set('Judze');
</script>

<div class="vertical-flex space-xl max-width">
	<!-- <EqualGrid --mobileColumnsQty="{2}" --desktopColumnsQty="{2}">
		<CircleDiagram />
		<div class="vertical-flex">
			<span>Days left: 91</span>
			<span>Time done: </span>
		</div>
	</EqualGrid> -->
	<Menu navTree="{navTree}"/>
</div>
