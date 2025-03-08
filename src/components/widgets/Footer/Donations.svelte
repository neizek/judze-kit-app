<script lang="ts">
    // import { onMount } from "svelte";
    // import Image from "../../ui/Image.svelte";
	// import "cordova-plugin-purchase/www/store.d";
	// import "cordova-plugin-purchase";
	

	// export class AppStoreService {

	// 	store?: CdvPurchase.Store;

	// 	constructor() {
	// 		this.platform.ready().then(() => {
	// 			this.store = CdvPurchase.store
	// 		});
	// 	}
	// }


	// console.log(store);
    // import { initializeIAP } from "$lib/payments";

	// onMount(() => {
	// 	initializeIAP();
	// });
</script>

<div class="Donations vertical-flex">
	<!-- <Image src="/donate.svg" alt="Donation image" --width="100%" --border-radius="5px"/>
	<p>The app is made for seafarers by seafarers. We have a lot of ideas on how to improve the quality and variaty of avaliable functions, however it takes a lot of power. Therefore to keep it free of charge, we would like to kindly ask for a support by donating funds to us. While donating you can also provide some comments for us to know the weak points and ways to improve. We really appreciate your assistance.</p>
	<form action="https://www.paypal.com/donate" method="post" target="_blank">
		<input type="hidden" name="hosted_button_id" value="LXW2KGVSBRYMS" />
		<button class="primary max-width" type="submit">Donate</button>
	</form> -->
	<p>The app is made for seafarers by seafarers. We have a lot of ideas on how to improve the quality and variaty of avaliable functions, however it takes a lot of time and power. Therefore to keep it free of charge, we would like to kindly ask for any support. You can feel free to contact us for any of these things:</p>
	<ul>
		<!-- <li>- Sponsorship or donations,</li> -->
		<li>- App's improvement suggestions,</li>
		<li>- Review and feedback,</li>
		<!-- <li>- Purchasing of the app,</li> -->
		<li>- Any other question related to the app.</li>
	</ul>
	<div class="space-between space">
		<!-- <a href="mailto:dnicer3@gmail.com" class="space-between space"> -->
		<div class="space-between space">
			<span class="material-icons notranslate">mail</span>
			<span>huhrjanskis@proton.me</span>
		</div>
		<!-- </a> -->
		<!-- <a href="tel:+37126972159" class="space-between space"> -->
		<div class="space-between space">
			<span class="material-icons notranslate">phone_in_talk</span>
			<span>+371 26 97 2159</span>
		</div>
		<!-- </a> -->
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

	// button {
	// 	justify-content: center;
	// }
</style>

