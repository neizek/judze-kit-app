<script>
    import Image from "../../ui/Image.svelte";
</script>

<div class="Donations vertical-flex space big">
	<Image src="/donate.svg" alt="Donation image" --width="100%" --border-radius="5px"/>
	<p>The app is made for seafarers by seafarers. We have a lot of ideas on how to improve the quality and variaty of avaliable functions, however it takes a lot of power. Therefore to keep it free of charge, we would like to kindly ask for a support by donating funds to us. While donating you can also provide some comments for us to know the weak points and ways to improve. We really appreciate your assistance.</p>
	<form action="https://www.paypal.com/donate" method="post" target="_blank">
		<input type="hidden" name="hosted_button_id" value="LXW2KGVSBRYMS" />
		<button class="primary max-width" type="submit">Donate</button>
	</form>
</div>

<style lang="scss">
	@include after-mobile {
		.Donations {
			max-width: 400px;
		}
	}

	button {
		justify-content: center;
	}
</style>

