<script lang="ts">
    import Menu from "../components/widgets/Menu/Menu.svelte";

    const menu = [
		{
			label: 'Navigation',
			items: [
				{label: 'Flags', icon: 'flag', link: 'navigation/flags'},
				{label: 'Sound Signals', icon: 'volume-high', link: 'navigation/soundsignals'},
				{label: 'Lights', icon: 'lightbulb', link: 'navigation/lights'},
				{label: 'Buoys', icon: 'house-flood-water', link: 'navigation/buoys'},
				{label: 'Rules', icon: 'book', link: 'navigation/rules'}
			]
		},
		{
			label: 'Weather',
			items: [
				{label: 'Wind', icon: 'wind', link: 'weather/wind'},
				{label: 'Clouds', icon: 'cloud', link: 'weather/clouds'}
			]			
		}
	]
</script>
<div class="wrapper w1000">
	<Menu menu="{menu}"/>
</div>