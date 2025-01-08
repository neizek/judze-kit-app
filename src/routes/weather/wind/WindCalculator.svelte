<script lang="ts">
    import { mod, toDegrees, toRadians } from "$lib/math";
    import { onMount, tick } from "svelte";
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

	// let drawing: HTMLCanvasElement;
	// let ctx: CanvasRenderingContext2D | null;
	// const circleRadius = 98;
	// const lineWidth = 2;

	// $: ctx = drawing ? drawing.getContext("2d") : null;

	// $: {
	// 	if (ctx && ctx !== null) {
	// 		drawCircle();
	// 	}
	// }

	// $: {
	// 	if (relativeWindDirection || shipsCourse) {
	// 		// clearTheCircle();
	// 		drawLine(relativeWindDirection);
	// 	}
	// }

	function calculateWind() {
    	// const theta = toRadians(relativeWindDirection - shipsCourse);
    	// const a = shipsSpeed; // Ship's speed
    	// const b = relativeWindSpeed; // Relative wind speed
    	// const cSquared = Math.pow(a, 2) + Math.pow(b, 2) - (2 * a * b * Math.cos(theta));
   		// trueWindSpeed = Math.sqrt(cSquared);
    	// const omega = Math.asin((b * Math.sin(theta)) / trueWindSpeed);
   		// trueWindDirection = mod((shipsCourse + toDegrees(omega)), 360);

		// Convert angles to radians
		const relWindDirRad = toRadians(relativeWindDirection);
		const shipsCourseRad = toRadians(shipsCourse);

		// Relative wind components
		const relWindX = relativeWindSpeed * Math.sin(relWindDirRad);
		const relWindY = relativeWindSpeed * Math.cos(relWindDirRad);

		// Ship's motion components
		const shipX = shipsSpeed * Math.sin(shipsCourseRad);
		const shipY = shipsSpeed * Math.cos(shipsCourseRad);

		// True wind components
		const trueWindX = relWindX - shipX;
		const trueWindY = relWindY - shipY;

		// True wind speed
		trueWindSpeed = Math.sqrt(trueWindX ** 2 + trueWindY ** 2);

		// True wind direction
		trueWindDirection = toDegrees(Math.atan2(trueWindX, trueWindY));
		if (trueWindDirection < 0) {
			trueWindDirection += 360; // Normalize to 0-360 degrees
		}
	}

	// function drawCircle() {
	// 	if(ctx === null) {
	// 		return;
	// 	}
    //     const centerX = drawing.width / 2;
    //     const centerY = drawing.height / 2;
	// 	ctx.translate(centerX, centerY);
    //     ctx.beginPath();
    //     ctx.arc(0, 0, circleRadius, 0, Math.PI * 2);
    //     ctx.fillStyle = "transparent";
	// 	ctx.lineWidth = 2;
	// 	ctx.strokeStyle = "white"
	// 	ctx.stroke();
    //     ctx.fill();
    //     ctx.resetTransform();	
	// }

	// function drawLine(angle: number) {
	// 	if (ctx === null) {
	// 		return;
	// 	}
	// 	const centerX = drawing.width / 2;
    //     const centerY = drawing.height / 2;
	// 	angle = angle - 90;
	// 	const x2 = Math.cos(toRadians(angle)) * circleRadius;
	// 	const y2 = Math.sin(toRadians(angle)) * circleRadius;
	// 	ctx.beginPath();
	// 	ctx.moveTo(centerX, centerY);
	// 	ctx.lineTo(x2, y2);
    //     ctx.fillStyle = "transparent";
	// 	ctx.lineWidth = 2;
	// 	ctx.strokeStyle = "white"
	// 	ctx.stroke();
    //     ctx.fill();
	// 	ctx.stroke();
	// }

	// function clearTheCircle() {
		
	// }

	onMount(() => {
		calculateWind();
	})
</script>

<EqualGrid --desktopColumnsQty="{1}" --mobileColumnsQty={1}>
	<div class="vertical-flex space big">
		<FormItem label="Relative wind direction">
			<Input bind:value="{relativeWindDirection}" on:input="{calculateWind}" min="{0}" max="{360}" step="{1}"/>
			<!-- <DegreesInput bind:value="{relativeWindDirection}" /> -->
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
	<div class="vertical-flex space big">
		<!-- <canvas width="200" height="200" bind:this="{drawing}"></canvas> -->
		<span>True wind direction: {String(Number(trueWindDirection).toFixed(0) ?? 0).padStart(3, '0')}&#176;</span>
		<span>True wind speed: {Number(trueWindSpeed).toFixed(1)} kn</span>
	</div>
</EqualGrid>