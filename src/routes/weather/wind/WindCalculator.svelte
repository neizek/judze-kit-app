<script lang="ts">
    import { mod, toDegrees, toRadians } from "$lib/math";
    import { onMount, tick } from "svelte";
    import EqualGrid from "../../../components/ui/EqualGrid.svelte";
import FormItem from "../../../components/ui/FormItem.svelte";
    import Input from "../../../components/ui/Input.svelte";
    import DegreesInput from "../../../components/ui/DegreesInput.svelte";

	let relativeWindDirection: number;
	let relativeWindSpeed: number;
	let shipsCourse: number;
	let shipsSpeed: number;
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
		
		const degToRad = Math.PI / 180;
		const radToDeg = 180 / Math.PI;
		
		const apparentWindDirection = (relativeWindDirection + shipsCourse) % 360;
		
		const apparentWindAngle = (270 - apparentWindDirection) * degToRad;
		
		const shipCourseAngle = (270 - shipsCourse) * degToRad;
		
		const apparentWindX = relativeWindSpeed * Math.cos(apparentWindAngle);
		const apparentWindY = relativeWindSpeed * Math.sin(apparentWindAngle);
		
		const shipVelocityX = shipsSpeed * Math.cos(shipCourseAngle);
		const shipVelocityY = shipsSpeed * Math.sin(shipCourseAngle);
		
		const trueWindX = apparentWindX - shipVelocityX;
		const trueWindY = apparentWindY - shipVelocityY;
		
		trueWindSpeed = Math.sqrt(trueWindX * trueWindX + trueWindY * trueWindY);
		
		let trueWindAngle;

		if (Math.abs(trueWindX) > 1e-5) {
			trueWindAngle = Math.atan2(trueWindY, trueWindX) * radToDeg;
		} else {
			if (Math.abs(trueWindY) > 1e-5) {
				trueWindAngle = 180.0 - (90.0 * trueWindY) / Math.abs(trueWindY);
			} else {
				trueWindAngle = 270.0;
			}
		}
		
		trueWindDirection = 270.0 - trueWindAngle;
		
		trueWindDirection = (trueWindDirection + 360) % 360;
		
		trueWindDirection = Math.round(trueWindDirection * 10) / 10;
		trueWindSpeed = Math.round(trueWindSpeed * 10) / 10;
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

	$: {
		shipsCourse, shipsSpeed, relativeWindDirection, relativeWindSpeed,
		calculateWind();
	}
</script>

<!-- <EqualGrid --desktopColumnsQty="{1}" --mobileColumnsQty={1}> -->
<div class="vertical-flex space-xl">
	<div class="vertical-flex space-l">
		<h3>Relative Wind</h3>
		<EqualGrid --mobileColumnsQty="2" --tabletColumnsQty="{2}"  --desktopColumnsQty="2">
			<FormItem label="Direction">
				<Input type="number" bind:value="{relativeWindDirection}" on:input="{calculateWind}" min="{0}" max="{360}" step="{1}" placeholder="240" />
			</FormItem>
			<FormItem label="Speed">
				<Input type="number" bind:value="{relativeWindSpeed}" on:input="{calculateWind}" min="{0}" max="{250}" step="{0.1}" placeholder="21.5" />
			</FormItem>
		</EqualGrid>
	</div>
	<div class="vertical-flex space-l">
		<h3>Vessel</h3>
		<EqualGrid --mobileColumnsQty="{2}" --tabletColumnsQty="{2}" --desktopColumnsQty="{2}">
			<FormItem label="True course">
				<Input type="number" bind:value="{shipsCourse}" on:input="{calculateWind}" min="{0}" max="{360}" step="{1}" placeholder="264" />
			</FormItem>
			<FormItem label="Speed">
				<Input type="number" bind:value="{shipsSpeed}" on:input="{calculateWind}" min="{0}" max="{250}" step="{0.1}" placeholder="16.2" />
			</FormItem>
		</EqualGrid>
	</div>
	<div class="vertical-flex space-l">
	<h3>True wind</h3>
	<div class="space-between" >
		<!-- <canvas width="200" height="200" bind:this="{drawing}"></canvas> -->
		 <EqualGrid --mobileColumnsQty="{2}" --tabletColumnsQty="{2}" --desktopColumnsQty="{2}">
			 <FormItem label="Direction">
				 <span class="text-size-m">{String(Number(trueWindDirection).toFixed(0) ?? 0).padStart(3, '0')}&#176;</span>
			 </FormItem>
			 <FormItem label="Speed">
				 <span class="text-size-m">{Number(!isNaN(trueWindSpeed) ? trueWindSpeed : 0).toFixed(1)} kn</span>
			 </FormItem>
		 </EqualGrid>
	</div>
	</div>
</div>
<!-- </EqualGrid> -->