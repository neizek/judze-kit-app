<script lang="ts">
    import Loader from "./Loader.svelte";


	export let icon: string | undefined = undefined;
	export let type: 'primary' | 'secondary' | 'dangerous' | 'transparent' | undefined = undefined;
	export let label: string | undefined = undefined;
	export let submit = false;
	export let bordered = false;
	export let disabled = false;
	export let isLoading = false;
	export let maxwidth = false;
</script>

<button
	on:click
	class="{(type ?? '') + (bordered ? ' bordered' : '') + (maxwidth ? ' max-width' : '')} ripple"
	disabled="{disabled}"
	type="{submit ? 'submit' : 'button'}"
>
	{#if icon}
		<i class="fa-solid fa-{icon}"></i>
	{/if}
	{#if label}
		<span>{label}</span>
	{/if}
	{#if isLoading}
		<Loader --size="16px" --line-width="2px" />
	{/if}
</button>

<style lang="scss">
	button {
		white-space: nowrap;
		justify-content: center;

		@include mobile {
			width: 100%;
		}
		
		&:disabled {
			span,
			i {
				opacity: 0.5;
				text-shadow: none;
			}
		}

		span {
			display: block;
		}

		i:not(:only-child) {
			font-size: 14px;
		}
	}

	.loader {
		width: 16px;
		height: 16px;
	}

	// .ripple{
	// 	position: relative;
	// 	overflow: hidden; 
	// }

	// .ripple:before {
	// 	border-radius: 50%;
	// 	background-color: rgba(255,255,255,0.6);
	// 	content:'';
	// 	position: absolute;
	// 	top: 50%; left: 50%;
	// 	width:0; height:0;
	// }

	// .ripple:focus:before {
	// 	transition: all 0.5s ease-out;
	// 	opacity:0;
	// 	width:160px;
	// 	height:160px;
	// 	margin-top:-80px;
	// 	margin-left:-80px;
	// }
</style>
