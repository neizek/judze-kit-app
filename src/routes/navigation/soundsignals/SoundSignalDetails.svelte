<script lang="ts">
	import { scale } from 'svelte/transition';
	import MorseCode from './MorseCode.svelte';
	import type { SoundSignalType, SoundsType } from './types';
	import { onDestroy } from 'svelte';
	import { Play, Pause } from '@lucide/svelte';

	export let signal: SoundSignalType;
	export let sounds: SoundsType;

	let activeSound: string | undefined = undefined;
	let currentAudio: HTMLAudioElement | undefined = undefined;

	function playAudioForLetter(letter: string, callback: () => void) {
		currentAudio = sounds[letter];

		if (sounds[letter] && currentAudio !== undefined) {
			currentAudio.play();
			currentAudio.onended = () => {
				callback();
			};
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
	});
</script>

<div class="space-between space-xl">
	<div class="flex flex-column space-l">
		<div class="line-blocks space-l">
			<span>Pattern:</span>
			<MorseCode morse={signal.morse} />
		</div>
		<span>{signal.description}</span>
	</div>
	{#if signal.pattern === activeSound && activeSound !== undefined}
		<button class="pa-m" on:click={() => stopPlay()} in:scale>
			<Pause size={24} />
		</button>
	{:else}
		<button class="pa-m" on:click={() => playSound(signal.pattern)} in:scale>
			<Play size={24} />
		</button>
	{/if}
</div>
