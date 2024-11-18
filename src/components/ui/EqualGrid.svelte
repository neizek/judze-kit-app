<div class="Grid {$$props.class}">
	<slot></slot>
</div>

<style lang="scss">
	.Grid {
		display: grid;
		grid-template-columns: repeat(var(--mobileColumnsQty), 1fr);
		width: 100%;
		grid-gap: 16px;

		@include after-mobile {
			grid-template-columns: repeat(var(--desktopColumnsQty, 6), 1fr);
			grid-gap: 24px;
		}
	}
</style>