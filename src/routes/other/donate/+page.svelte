<script>
    import Button from "../../../components/ui/Button.svelte";
    import EqualGrid from "../../../components/ui/EqualGrid.svelte";
    import Image from "../../../components/ui/Image.svelte";
    import Section from "../../../components/ui/Section.svelte";

</script>
<!-- <section class="vertical-flex section-box space big"> -->
<Section>
	<EqualGrid --desktopColumnsQty="{2}" --mobileColumnsQty="{1}">
		<Image src="/donate.svg" alt="Donation image" --width="100%" --border-radius="5px"/>
		<div>
			<p>The app is made for seafarers by seafarers. We have a lot of ideas on how to improve the quality and variaty of avaliable functions, however it takes a lot of power. Therefore to keep it free of charge, we would like to kindly ask for a support by donating funds to us. While donating you can also provide some comments for us to know the weak points and ways to improve. We really appreciate your assistance.</p>
			<form action="https://www.paypal.com/donate" method="post" target="_top">
				<input type="hidden" name="hosted_button_id" value="LXW2KGVSBRYMS" />
				<!-- <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" /> -->
				<!-- <Button label="Donate" on:click="submit"/> -->
					<button class="primary" type="submit">Donate</button>
				<!-- <img alt="" border="0" src="https://www.paypal.com/en_LV/i/scr/pixel.gif" width="1" height="1" /> -->
			</form>
		</div>
	</EqualGrid>
</Section>
<!-- </section> -->
	