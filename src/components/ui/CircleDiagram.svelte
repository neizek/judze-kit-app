<script lang="ts">
	export let percentage: number = 80;
</script>

<div class="single-chart">
    <svg viewBox="0 0 36 36" class="circular-chart">
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
      <!-- <text x="18" y="20.35" class="percentage">90%</text> -->
    </svg>
  </div>

  <style lang="scss">

		.circular-chart {
			display: block;
			margin: 10px auto;
			max-width: 80%;
			max-height: 250px;
			stroke: var(--primary-color)
		}

		.circle-bg {
			fill: none;
			stroke: var(--box-background-color);
			stroke-width: 2.8;
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

		// .circular-chart.blue .circle {
		// stroke: #3c9ee5;
		// }

		// .percentage {
		// 	fill: #666;
		// 	font-family: sans-serif;
		// 	font-size: 0.5em;
		// 	text-anchor: middle;
		// }


  </style>
