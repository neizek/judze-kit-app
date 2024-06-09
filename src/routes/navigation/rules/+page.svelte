<script>
    import Details from "../../../components/ui/Details.svelte";
    import RuleFive from "./rulesTexts/RuleFive.svelte";
    import RuleFour from "./rulesTexts/RuleFour.svelte";
    import RuleSeven from "./rulesTexts/RuleSeven.svelte";
</script>

<div class="section-box max-width vertical-flex space">
	<h2 class="bold">Part B - Steering & sailing</h2>
	<Details header="Rule 4 - Application">
		<RuleFour />
	</Details>
	<Details header="Rule 5 - Look Out">
		<RuleFive />
	</Details>
	<Details header="Rule 7 - Risk of Collision">
		<RuleSeven />
	</Details>
</div>