<script>
    import { title } from "$lib/meta";
    import Details from "../../../components/ui/Details.svelte";
    import Section from "../../../components/ui/Section.svelte";
    import RuleEight from "./rulesTexts/PartB/RuleEight.svelte";
    import RuleEleven from "./rulesTexts/PartB/RuleEleven.svelte";
    import RuleFifteen from "./rulesTexts/PartB/RuleFifteen.svelte";
    import RuleFive from "./rulesTexts/PartB/RuleFive.svelte";
    import RuleFour from "./rulesTexts/PartB/RuleFour.svelte";
    import RuleFourteen from "./rulesTexts/PartB/RuleFourteen.svelte";
    import RuleNine from "./rulesTexts/PartB/RuleNine.svelte";
    import RuleOne from "./rulesTexts/PartA/RuleOne.svelte";
    import RuleSeven from "./rulesTexts/PartB/RuleSeven.svelte";
    import RuleSeventeen from "./rulesTexts/PartB/RuleSeventeen.svelte";
    import RuleSix from "./rulesTexts/PartB/RuleSix.svelte";
    import RuleSixteen from "./rulesTexts/PartB/RuleSixteen.svelte";
    import RuleTen from "./rulesTexts/PartB/RuleTen.svelte";
    import RuleThirtheen from "./rulesTexts/PartB/RuleThirtheen.svelte";
    import RuleTwelve from "./rulesTexts/PartB/RuleTwelve.svelte";
    import RuleTwo from "./rulesTexts/PartA/RuleTwo.svelte";
    import RulteThree from "./rulesTexts/PartA/RulteThree.svelte";
    import RuleEighteen from "./rulesTexts/PartB/RuleEighteen.svelte";
    import RuleNineteen from "./rulesTexts/PartB/RuleNineteen.svelte";

	title.set('Rules')
</script>
<div class="vertical-flex space max-width">
	<Section title="Part A - General">
		<Details header="Rule 1 - Application">
			<RuleOne />
		</Details>
		<Details header="Rule 2 - Responsibility">
			<RuleTwo />
		</Details>
		<Details header="Rule 3 - General Definitions">
			<RulteThree />
		</Details>
	</Section>
	<Section title="Part B - Steering & Sailing">
		<h3 class="subheader">Section I - Any Conditions of Visibility</h3>
		<Details header="Rule 4 - Application">
			<RuleFour />
		</Details>
		<Details header="Rule 5 - Look Out">
			<RuleFive />
		</Details>
		<Details header="Rule 6 - Safe Speed">
			<RuleSix />
		</Details>
		<Details header="Rule 7 - Risk of Collision">
			<RuleSeven />
		</Details>
		<Details header="Rule 8 - Action to avoid Collision">
			<RuleEight />
		</Details>
		<Details header="Rule 9 - Narrow Channels">
			<RuleNine />
		</Details>
		<Details header="Rule 10 - Traffic Separation Schemes">
			<RuleTen />
		</Details>
		<h3 class="subheader">Section II - In Sight of One Another</h3>
		<Details header="Rule 11 - Application">
			<RuleEleven />
		</Details>
		<Details header="Rule 12 - Sailing Vessels">
			<RuleTwelve />
		</Details>
		<Details header="Rule 13 - Overtaking">
			<RuleThirtheen />
		</Details>
		<Details header="Rule 14 - Head-on Situation">
			<RuleFourteen />
		</Details>
		<Details header="Rule 15 - Crossing Situation">
			<RuleFifteen />
		</Details>
		<Details header="Rule 16 - Action by Give-way Vessel">
			<RuleSixteen />
		</Details>
		<Details header="Rule 17 - Action by Stand-on Vessel">
			<RuleSeventeen />
		</Details>
		<Details header="Rule 18 - Responsibilities between Vessels">
			<RuleEighteen />
		</Details>
		<h3 class="subheader">Section III - In Restricted Visibility</h3>
		<Details header="Rule 19 - Conduct in Restricted Visibility">
			<RuleNineteen />
		</Details>
	</Section>
</div>

<style lang="scss">
	.subheader {
		font-weight: 400;
		height: 32px;
		text-align: center;
		align-content: center;
	}
</style>