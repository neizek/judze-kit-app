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
    import RuleTwenty from "./rulesTexts/PartC/RuleTwenty.svelte";
    import RuleTwentyOne from "./rulesTexts/PartC/RuleTwentyOne.svelte";
    import RuleTwentyTwo from "./rulesTexts/PartC/RuleTwentyTwo.svelte";
    import RuleTwentyThree from "./rulesTexts/PartC/RuleTwentyThree.svelte";
    import RuleTwentyFour from "./rulesTexts/PartC/RuleTwentyFour.svelte";
    import RuleTwentyFive from "./rulesTexts/PartC/RuleTwentyFive.svelte";
    import RuleTwentySix from "./rulesTexts/PartC/RuleTwentySix.svelte";
    import RuleTwentySeven from "./rulesTexts/PartC/RuleTwentySeven.svelte";
    import RuleTwentyEight from "./rulesTexts/PartC/RuleTwentyEight.svelte";
    import RuleTwentyNine from "./rulesTexts/PartC/RuleTwentyNine.svelte";
    import RuleThirty from "./rulesTexts/PartC/RuleThirty.svelte";
    import RuleFourtyOne from "./rulesTexts/PartF/RuleFourtyOne.svelte";
    import RuleFourty from "./rulesTexts/PartF/RuleFourty.svelte";
    import RuleThirtyNine from "./rulesTexts/PartF/RuleThirtyNine.svelte";
    import RuleThirtyEight from "./rulesTexts/PartE/RuleThirtyEight.svelte";
    import RuleThirtyThree from "./rulesTexts/PartD/RuleThirtyThree.svelte";
    import RuleThirtyTwo from "./rulesTexts/PartD/RuleThirtyTwo.svelte";
    import RuleThirtyFour from "./rulesTexts/PartD/RuleThirtyFour.svelte";
    import RuleThirtyFive from "./rulesTexts/PartD/RuleThirtyFive.svelte";
    import RuleThirtySix from "./rulesTexts/PartD/RuleThirtySix.svelte";
    import RuleThirtySeven from "./rulesTexts/PartD/RuleThirtySeven.svelte";
    import RuleThirtyOne from "./rulesTexts/PartC/RuleThirtyOne.svelte";

	title.set('Rules')
</script>
<div class="vertical-flex space-xl max-width">
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
	<Section title="Part C - Lights & Shapes">
		<Details header="Rule 20 - Application">
			<RuleTwenty />
		</Details>
		<Details header="Rule 21 - Definitions">
			<RuleTwentyOne />
		</Details>
		<Details header="Rule 22 - Visibility of Lights">
			<RuleTwentyTwo />
		</Details>
		<Details header="Rule 23 - Power-driven Vessels underway">
			<RuleTwentyThree />
		</Details>
		<Details header="Rule 24 - Towing and Pushing">
			<RuleTwentyFour />
		</Details>
		<Details header="Rule 25 - Sailing Vessels underway and Vessels under Oars">
			<RuleTwentyFive />
		</Details>
		<Details header="Rule 26 - Fishing Vessels">
			<RuleTwentySix />
		</Details>
		<Details header="Rule 27 - Vessels not under Command or Restricted in their Ability to Manoeuvre">
			<RuleTwentySeven />
		</Details>
		<Details header="Rule 28 - Vessel constrained by their draught">
			<RuleTwentyEight />
		</Details>
		<Details header="Rule 29 - Pilot Vessels">
			<RuleTwentyNine />
		</Details>
		<Details header="Rule 30 - Anchored Vessels and Vessels aground">
			<RuleThirty />
		</Details>
		<Details header="Rule 31 - Seaplanes">
			<RuleThirtyOne />
		</Details>
	</Section>
	<Section title="Part D - Sound and Light Signals">
		<Details header="Rule 32 - Definitions">
			<RuleThirtyTwo />
		</Details>
		<Details header="Rule 33 - Equipment for Sound">
			<RuleThirtyThree />
		</Details>
		<Details header="Rule 34 - Manoeuvring and warning">
			<RuleThirtyFour />
		</Details>
		<Details header="Rule 35 - Restricted Visibility">
			<RuleThirtyFive />
		</Details>
		<Details header="Rule 36 - Signals to Attract Attention">
			<RuleThirtySix />
		</Details>
		<Details header="Rule 37 - Distress Signals">
			<RuleThirtySeven />
		</Details>
	</Section>
	<Section title="Part E - Exemptions">
		<Details header="Rule 38 - Exemptions">
			<RuleThirtyEight />
		</Details>
	</Section>
	<Section title="Part F - Verification of compliance with the provisions of the Convention">
		<Details header="Rule 39 - Definitions">
			<RuleThirtyNine />
 		</Details>
		<Details header="Rule 40 - Application">
			<RuleFourty />
		</Details>
		<Details header="Rule 41 - Verification of Compliance">
			<RuleFourtyOne />
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