<script lang="ts">
    import { mod, toDegrees, toRadians } from "$lib/math";
    import { onMount } from "svelte";
    import EqualGrid from "../../../components/ui/EqualGrid.svelte";
import FormItem from "../../../components/ui/FormItem.svelte";
    import Input from "../../../components/ui/Input.svelte";
    import DegreesInput from "../../../components/ui/DegreesInput.svelte";

	let relativeWindDirection: number = 0;
	let relativeWindSpeed: number = 10;
	let shipsCourse: number = 0;
	let shipsSpeed: number = 15;
	let trueWindDirection: number;
	let trueWindSpeed: number;

	function calculateWind() {
    	const theta = toRadians(relativeWindDirection - shipsCourse);
    	const a = shipsSpeed; // Ship's speed
    	const b = relativeWindSpeed; // Relative wind speed
    	const cSquared = Math.pow(a, 2) + Math.pow(b, 2) - (2 * a * b * Math.cos(theta));
   		trueWindSpeed = Math.sqrt(cSquared);
    	const omega = Math.asin((b * Math.sin(theta)) / trueWindSpeed);
   		trueWindDirection = mod((shipsCourse + toDegrees(omega)), 360);

		if(!drawing) {
			return;
		}
		const ctx = drawing.getContext("2d");
        // Get the center of the canvas
        const centerX = drawing.width / 2;
        const centerY = drawing.height / 2;

		if(!ctx) {
			return;
		}
        // Translate the origin to the center of the canvas
        ctx.translate(centerX, centerY);

        // Example: Draw a circle at the center
        ctx.beginPath();
        ctx.arc(0, 0, 98, 0, Math.PI * 2); // Use (0, 0) because the origin is now at the center
        ctx.fillStyle = "transparent";
		ctx.lineWidth = 2;
		ctx.strokeStyle = "white"
		ctx.stroke();
        ctx.fill();

        // Reset transformation (optional if you need to do more drawing)
        ctx.resetTransform();
	}

	let drawing: HTMLCanvasElement;
	onMount(() => {
		calculateWind();
	})
</script>

<EqualGrid>
	<div class="vertical-flex space">
		<FormItem label="Relative wind direction">
			<!-- <Input bind:value="{relativeWindDirection}" on:input="{calculateWind}" padstart="{3}" min="{0}" max="{360}" step="{1}"/> -->
			<DegreesInput bind:value="{relativeWindDirection}" />
		</FormItem>
		<FormItem label="Relative wind speed">
			<Input bind:value="{relativeWindSpeed}" on:input="{calculateWind}" />
		</FormItem>
		<FormItem label="Ship's true course">
			<Input bind:value="{shipsCourse}" on:input="{calculateWind}" />
		</FormItem>
		<FormItem label="Ship's speed">
			<Input bind:value="{shipsSpeed}" on:input="{calculateWind}" />
		</FormItem>
	</div>
	<div class="vertical-flex space">
		<canvas width="200" height="200" bind:this="{drawing}"></canvas>
		<span>True wind direction: {Number(trueWindDirection)}</span>
		<span>True wind speed: {Number(trueWindSpeed).toFixed(2)}</span>
	</div>
</EqualGrid>