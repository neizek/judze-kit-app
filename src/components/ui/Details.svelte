<script lang="ts">
    import { fade, slide } from "svelte/transition";

	export let header: string;
</script>

<details>
	<summary class="space-between">
		<h3>{ header }</h3>
		<span class="material-icons notranslate">chevron_right</span>
	</summary>
	<article in:fade="{{duration: 200}}"><slot></slot></article>
</details>

<style lang="scss">
	details {
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;

		&[open] > summary {
			background-color: var(--button-background-color-hover);
			
			> span.material-icons {
				transform: rotate(90deg);
			}
			

		}

		// &[open] article {
		// 	max-height: 1000px;
		// }

		summary {
			-webkit-tap-highlight-color: transparent;
			padding: 6px 0 6px 8px;
			border-radius: 5px;
			list-style: none;

			&:hover {
				background-color: var(--button-background-color-hover);
			}

			&::marker {
				content: '';
			}

			&::-webkit-details-marker {
				display:none;
			}

			> span.material-icons {
				transition: transform .3s ease-in-out;
			}
		}

		article {
			padding: 10px;
			// max-height: 0;
			// overflow: hidden;
			// transition: max-height 0.5s ease-out;
		}


	}

</style>