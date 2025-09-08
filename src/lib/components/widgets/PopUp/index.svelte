<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
	import { closeAllPopUps, closePopUp, popUps } from '.';
	import { beforeNavigate } from '$app/navigation';

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === ('Escape' as string)) {
			closeAllPopUps();
			return;
		}
	};

	beforeNavigate(() => closeAllPopUps);
</script>

<svelte:window on:keydown={handleKeydown} />

{#if Array.isArray($popUps)}
	{#each $popUps as popUp, id}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="Popup focus-background"
			transition:fade={{ duration: 200 }}
			on:click|self={() => closePopUp(popUp.id)}>
			<div
				class="box vertical-flex space-xl light-shadow"
				transition:fly={{ y: 200, duration: 300, easing: cubicOut }}>
				<header class="space-between mobile space">
					<h3>
						{popUp.header}
					</h3>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<span class="opacity-transition" on:click={() => closePopUp(popUp.id)}>
						<!-- <i class="fa-solid fa-xmark"></i> -->
						<span class="material-icons pa">close</span>
					</span>
				</header>
				<article class="hide-scroll">
					{#if typeof popUp.content === 'string'}
						{popUp.content}
					{:else}
						<svelte:component this={popUp.content.component} {...popUp.content.props} />
					{/if}
				</article>
			</div>
		</div>
	{/each}
{/if}
<slot></slot>

<style lang="scss">
	.focus-background {
		display: flex;
	}

	.box {
		will-change: transform;
		background: var(--box-background-color);
		min-width: 350px;
		article {
			padding: 0px;
		}
	}

	.Popup {
		@include after-mobile {
			justify-content: center;
			align-items: center;

			.box {
				padding: 20px;
				max-width: 90%;
				max-height: 70vh;
				border-radius: 8px;
				overflow-y: scroll;

				@include desktop {
					max-width: 40%;
				}

				@include mobile {
					width: 90vw;
				}
			}
		}

		@include mobile {
			.box {
				width: 100%;
				max-width: 450px;
				margin: 0 auto;
				left: 0;
				right: 0;
				bottom: 0;
				border-radius: 10px 10px 0 0;
				padding: 20px 20px calc(20px + env(safe-area-inset-bottom)) 20px;
				position: fixed;
				box-shadow: 0 0 20px 1px #0000001a;
				max-height: 70lvh;
				overflow: hidden;

				article {
					overflow-y: scroll;
					overflow-x: hidden;
				}
			}
		}
	}
</style>
