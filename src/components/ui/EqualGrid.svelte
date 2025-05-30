<div class="Grid {$$props.class}">
	<slot></slot>
</div>

<style lang="scss">
	.Grid {
		display: grid;
		grid-template-columns: repeat(var(--mobileColumnsQty), 1fr);
		width: var(--width, 100%);
		grid-gap: 16px;

		@include tablet {
			grid-template-columns: repeat(var(--tabletColumnsQty, 4), 1fr);
			grid-gap: 24px;
		}

		@include desktop {
			grid-template-columns: repeat(var(--desktopColumnsQty, 6), 1fr);
			grid-gap: 24px;
		}
	}
</style>