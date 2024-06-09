<script lang="ts">
    import { title } from "$lib/meta";

	$title = 'Clouds'

	const cloudsArray = [
		{
			header: "High 5.000m - 13.000m",
			clouds: [
				{title: 'Cirrus', img: 'cirrus', description: ''},
				{title: 'Cirrocumulus', img: 'cirrocumulus', description: ''},
				{title: 'Cirrostratus', img: 'cirrostratus', description: ''}
			]
		},
		{
			header: 'Middle 2.000m - 7.000m',
			clouds: [
				{title: 'Altocumulus', img: 'altocumulus', description: ''},
				{title: 'Altostratus', img: 'altostratus', description: ''}			
			]
		},
		{
			header: 'Low 0m - 2.000m',
			clouds: [
				{title: 'Nimbostratus', img: 'nimbostratus', description: ''},
				{title: 'Stratocumulus', img: 'stratocumulus', description: ''},
				{title: 'Stratus', img: 'stratus', description: ''}	
			]
		}
	]</script>
<div class="vertical-flex max-width space">
	{#each cloudsArray as cloudCategory}
		<h2>{ cloudCategory.header }</h2>
		<div class="Clouds section-box equal-flex">
			{#each cloudCategory.clouds as cloud}
			<div class="vertical-flex space">
				<img src="/clouds/{cloud.img}.jpg" alt="{cloud.title}">
				<span>{cloud.title}</span>
			</div>
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	.Clouds {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 8px;

		@include after-mobile {
			grid-gap: 16px;
		}

		div > img {
			height: 100px;
			width: 100%;
			object-fit: cover;

			@include after-mobile {
				height: 250px;
			}
		}
	}
</style>

