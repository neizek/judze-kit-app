<script lang="ts">
  import { scale } from "svelte/transition";
  import MorseCode from "./MorseCode.svelte";
  import type { SoundSignalType, SoundsType } from "./types";
  import { onDestroy } from "svelte";
//   import { bellfivemp3, bellmp3, emptymp3, gongfivemp3, prolongedmp3, shortmp3 } from "./empty";

	export let signal: SoundSignalType;

	// const sounds: SoundsType = {
	// 	"-": new Audio('/audio/prolonged.mp3'),
	// 	".": new Audio('/audio/short.mp3'),
	// 	" ": new Audio('/audio/empty_converted.mp3'),
	// 	"b": new Audio('/audio/bell.mp3'),
	// 	"B": new Audio('/audio/bellfive_converted.mp3'),
	// 	"G": new Audio('/audio/gongfive.mp3')
	// }

	// const sounds: SoundsType = {
	// 	"-": new Audio(prolongedmp3),
	// 	".": new Audio(shortmp3),
	// 	" ": new Audio(emptymp3),
	// 	"b": new Audio(bellmp3),
	// 	"B": new Audio(bellfivemp3),
	// 	"G": new Audio(gongfivemp3),
	// }
	export let sounds: SoundsType;

	let activeSound: string | undefined = undefined;
	let currentAudio: HTMLAudioElement | undefined = undefined;

	function playAudioForLetter(letter: string, callback: () => void) {
		currentAudio = sounds[letter];

		if (sounds[letter] && currentAudio !== undefined) {
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

<div class="space-between space-xl">
	<div class="vertical-flex space">
		<div class="line-blocks space big">
			<span>Pattern:</span>
			<MorseCode morse="{signal.morse}" />
		</div>
		<span>{signal.description}</span>
	</div>
		{#if signal.pattern === activeSound && activeSound !== undefined}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span
				class="material-icons notranslate pa"
				in:scale
				on:click={() => stopPlay()} 
			>
				pause_circle
			</span>
		{:else}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span
				class="material-icons notranslate link pa"
				in:scale
				on:click={() => playSound(signal.pattern)}
			>
				play_circle
			</span>
		{/if}
</div>