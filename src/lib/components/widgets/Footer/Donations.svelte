<script lang="ts">
	import { Mail, Phone } from '@lucide/svelte';
</script>

<div class="Donations vertical-flex">
	<p>
		The app is made for seafarers by seafarers. We have a lot of ideas on how to improve the
		quality and variaty of avaliable functions, however it takes a lot of time and power.
		Therefore to keep it free of charge, we would like to kindly ask for any support. You can
		feel free to contact us for any of these things:
	</p>
	<ul>
		<li>- App's improvement suggestions,</li>
		<li>- Review and feedback,</li>
		<li>- Any other question related to the app.</li>
	</ul>
	<div class="space-around space">
		<a href="mailto:huhrjanskis@proton.me" class="space-between space">
			<Mail />
			<span>huhrjanskis@proton.me</span>
		</a>
		<a href="tel:+37126972159" class="space-between space">
			<Phone />
			<span>+371 26 97 2159</span>
		</a>
	</div>
</div>

<style lang="scss">
	.Donations p {
		margin-bottom: 0;
	}

	@include after-mobile {
		.Donations {
			max-width: 400px;
		}
	}
</style>
