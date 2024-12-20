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

		&[open] > summary {
			background-color: var(--button-background-color-hover);
			
			> span.material-icons {
				transform: rotate(90deg);
			}	
		}

		summary {
			padding: 6px 0 6px 8px;
			border-radius: 5px;

			&:hover {
				background-color: var(--button-background-color-hover);
			}

			&::marker {
				content: '';
			}

			> span.material-icons {
				transition: transform .3s ease-in-out;
			}
		}

		article {
			padding: 10px;
		}
	}

</style>