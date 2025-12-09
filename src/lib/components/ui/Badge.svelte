<script lang="ts">
	let {
		label,
		size,
		color,
	}: { label: string; size?: 'xs' | 'm' | 'l'; color?: 'green' | 'red'; clases?: string } =
		$props();
</script>

<div class="Badge color-{color} size-{size}">
	{label}
</div>

<style lang="scss">
	.color {
		&-green {
			background-color: #3ec13e;
			color: white;
		}
		&-red {
			background-color: #eb0000;
			color: white;
		}
	}
	.size {
		&-xs {
			font-size: var(--font-size-xs);
			border-radius: var(--size-s);
			padding: var(--size-xs) var(--size-m);
		}
		// &-m {
		// 	font-size: var(--font-size-xs);
		// 	border-radius: var(--size-xs);
		// }
		// &-l {
		// 	font-size: var(--font-size-xs);
		// 	border-radius: var(--size-xs);
		// }
	}
</style>
