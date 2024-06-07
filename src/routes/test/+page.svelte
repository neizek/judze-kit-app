<script lang="ts">
    import { Geolocation } from '@capacitor/geolocation';
    import type { Position } from '@capacitor/geolocation';

    let loc: Position | undefined = undefined;
    async function getCurrentPosition(){
        const res = await Geolocation.getCurrentPosition()
        loc = res
    }
</script>

<div>
    <h1>Geolocation</h1>
    <p>Your location is:</p>
    <p>Latitude: {loc?.coords.latitude}</p>
    <p>Longitude: {loc?.coords.longitude}</p>

    <button on:click={getCurrentPosition}>
        Get Current Location
    </button>
</div>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<style>
    div {
        padding-top: 50px;
    }
</style>