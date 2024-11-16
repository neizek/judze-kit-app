<script lang="ts">
    import isMobile from "$lib/deviceDetector";
import { title } from "$lib/meta";
    import EqualGrid from "../../../components/ui/EqualGrid.svelte";
    import Image from "../../../components/ui/Image.svelte";

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
	]
</script>
<section class="vertical-flex max-width">
	{#each cloudsArray as cloudCategory}
		<div class="vertical-flex max-width space">
			<h2>{ cloudCategory.header }</h2>
			<EqualGrid --mobileColumnsQty="{3}" --desktopColumnsQty="{3}" class="section-box equal-flex">
					{#each cloudCategory.clouds as cloud}
						<div class="vertical-flex space">
							<Image
								src="/clouds/{cloud.img}.jpg"
								alt="{cloud.title}"
								--height="{isMobile ? `100px` : `250px`}"
								--width="100%"
								--object-fit="cover"
							/>
							<span>{cloud.title}</span>
						</div>
					{/each}
			</EqualGrid>
		</div>
	{/each}
</section>

