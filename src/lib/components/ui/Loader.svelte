<div class="loader"></div>

<style lang="scss">
	:root {
		--fill-color: #{$primaryColor};

		&[data-theme='dark'] {
			--fill-color: #{$c-white};
		}
	}

	.loader {
		display: inline-block;
		width: var(--size, 16px);
		height: var(--size, 16px);
	}

	.loader:after {
		content: ' ';
		display: block;
		width: calc(var(--size, 16px) - var(--line-width, 2px) * 2);
		height: calc(var(--size, 16px) - var(--line-width, 2px) * 2);
		border-radius: 50%;
		border: var(--line-width, 2px) solid var(--fill-color);
		border-color: var(--fill-color) transparent var(--fill-color) transparent;
		animation: lds-dual-ring 1.3s linear infinite;
	}

	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
