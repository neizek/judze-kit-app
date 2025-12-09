<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { toasts } from '.';
	import { flip } from 'svelte/animate';
</script>

<div class="Notifications">
	{#each $toasts as toast (toast.id)}
		<div
			class="Notification {toast.type}"
			animate:flip={{ duration: 200 }}
			in:fly={{ y: -200, duration: 300 }}
			out:fade={{ duration: 300 }}>
			{toast.text}
		</div>
	{/each}
</div>

<style lang="scss">
	.Notifications {
		position: fixed;
		z-index: 100;
		width: auto;
		align-self: center;
		top: calc(
			10px + var(--size-xl) + var(--header-height) +
				var(--safe-area-inset-top, env(safe-area-inset-top))
		);

		.Notification {
			width: inherit;
			margin: 0 10px;
			margin-top: 10px;
			height: auto;
			color: #fff;
			padding: 20px;
			border-radius: 8px;
			-webkit-box-shadow: 0 0 10px rgb(34 36 38 / 30%);
			box-shadow: 0 0 10px rgb(34 36 38 / 30%);

			&.success {
				background-color: #3ec13e;
			}

			&.error {
				background-color: #eb0000;
			}

			&.alert {
				background-color: #ffaa07;
			}

			@include after-mobile {
				width: 350px;
			}
		}
	}
</style>
