<script>
    import Details from "../../../components/ui/Details.svelte";
    import Section from "../../../components/ui/Section.svelte";
    import RuleFive from "./rulesTexts/RuleFive.svelte";
    import RuleFour from "./rulesTexts/RuleFour.svelte";
    import RuleSeven from "./rulesTexts/RuleSeven.svelte";
</script>
<Section title="Part B - Steering & sailing">
	<Details header="Rule 4 - Application">
		<RuleFour />
	</Details>
	<Details header="Rule 5 - Look Out">
		<RuleFive />
	</Details>
	<Details header="Rule 7 - Risk of Collision">
		<RuleSeven />
	</Details>
</Section>