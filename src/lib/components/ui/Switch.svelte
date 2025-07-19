<script lang="ts">
	export let label: string | undefined = undefined;
	export let hasError: boolean = false;
	export let value: boolean = false;
	export let disabled: boolean = false;
	export let onChange: (() => void) | undefined = undefined;
</script>

<label class="space-between" class:error="{hasError}">
	{#if label}
		<span>{label}</span>
	{/if}
	<div class="Switch" >
		<input
			type="checkbox"
			on:blur
			on:change="{onChange}"
			on:keypress
			on:keydown
			on:keyup
			on:input
			bind:checked="{value}"
			{disabled}
		/>
		<span class="Slider input"></span>
	</div>
</label>

<style lang="scss">
	
	.Switch {
		--switchWidth: 50px;
		--switchHeight: 24px;
		--switchButtonPadding: 5px;
		--switcClackHeight: calc(var(--switchHeight) - var(--switchButtonPadding) * 2);

		position: relative;
		display: inline-block;
		width: var(--switchWidth);
		height: var(--switchHeight);

		input {
			opacity: 0;
			width: 0;
			height: 0;

			&:checked + .Slider {
				background-color: #{$primaryColor};

				&::before {
					background-color: $c-white;
					transform: translateX(var(--switchHeight));
				}
			}
		}
	}

	.Slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		transition: 0.4s ease-out;
		border-radius: var(--switchHeight);

		&:before {
			position: absolute;
			content: "";
			height: var(--switcClackHeight);		
			width: var(--switcClackHeight);
			left: var(--switchButtonPadding);
			bottom: calc(50% - var(--switcClackHeight)/2);
			background-color: var(--default-font-color);
			transition: 0.4s ease-out;
			border-radius: 50%;
		}
	}
</style>
