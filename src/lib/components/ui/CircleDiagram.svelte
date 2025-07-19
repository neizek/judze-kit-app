<script lang="ts">
  import { onMount } from "svelte";

	export let percentage: number;

	onMount(() => {
		if (percentage < 0) {
			percentage = 0;
		}
		if (percentage > 100) {
			percentage = 100;
		}
	})
</script>

<div class="single-chart">
    <svg viewBox="0 0 36 36" class="circular-chart"  style="{$$restProps.style}">
      <path class="circle-bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path class="circle"
        stroke-dasharray="{percentage}, 100"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
    </svg>
	<slot></slot>
  </div>

<style lang="scss">
	:root {
		--stroke-color: var(--box-border-color);

		&[data-theme='dark'] {
			--stroke-color: var(--box-background-color);
		}
	}

	.circular-chart {
		display: block;
		margin: 10px auto;
		max-width: 80%;
		max-height: 250px;
		stroke: var(--primary-color)
	}

	.circle-bg {
		fill: none;
		stroke-width: 2.8;
		stroke: var(--stroke-color)
	}

	.circle {
	fill: none;
	stroke-width: 2.8;
	stroke-linecap: round;
	animation: progress 1s ease-out forwards;
	}

	@keyframes progress {
		0% {
			stroke-dasharray: 0 100;
		}
	}
</style>
