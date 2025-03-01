<script lang="ts">
  import { scale } from "svelte/transition";
  import MorseCode from "./MorseCode.svelte";
  import type { SoundSignalType, SoundsType } from "./types";
  import type { ClosePopup } from "../../../components/widgets/PopUp.svelte";
  import { onDestroy } from "svelte";

	export let signal: SoundSignalType;

	const sounds: SoundsType = {
		"-": new Audio(`/audio/prolonged.mp3`),
		".": new Audio(`/audio/short.mp3`),
		" ": new Audio(`/audio/empty.mp3`),
		"b": new Audio(`/audio/bell.mp3`),
		"B": new Audio(`/audio/bellfive.mp3`),
		"G": new Audio(`/audio/gongfive.mp3`)
	}

	let activeSound: string | undefined = undefined;
	let currentAudio: HTMLAudioElement | undefined = undefined;

	function playAudioForLetter(letter: string, callback: () => void) {
		currentAudio = sounds[letter];

		if (currentAudio) {
			currentAudio.play();
			currentAudio.onended = () => {
				callback();
			}
		}
	}

	function playSound(pattern: string, index = 0) {

		if (index === 0) {
			if (activeSound) {
				stopPlay();
			}
			activeSound = pattern;
		}

		if (index >= pattern.length) {
			activeSound = undefined;
			return;
		}

   		const letter = pattern[index];

		playAudioForLetter(letter, () => {
			playSound(pattern, index + 1);
		});
	}

	function stopPlay() {
		if (currentAudio) {
			currentAudio.pause();
			currentAudio.currentTime = 0;
		}
		activeSound = undefined;
	}

	onDestroy(() => {
		stopPlay();
	})
</script>

<div class="Details vertical space">
	<span>{signal.description}</span>
	<div class="space-between space">
		<div class="line-blocks space big">
			<span>Pattern:</span>
			<MorseCode morse="{signal.morse}" />
		</div>
		<div>
			{#if signal.pattern === activeSound && activeSound !== undefined}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div on:click={() => stopPlay()} >
					<span class="material-icons notranslate" in:scale>pause_circle</span>
				</div>
			{:else}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="link" on:click={() => playSound(signal.pattern)}>
					<span class="material-icons notranslate" in:scale>play_circle</span>
				</div>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.Details {
		@include after-mobile {
			width: 400px;
		}
	}
</style>