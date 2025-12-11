import { countries } from "$lib/constants/countries"

export interface NavigationalFlag {
	name: string,
	icon: string,
	letter?: string,
	morse?: string,
	description?: string
}

export interface NationalFlag {
	name: string;
	icon: string;
	iso: string;
	code: string;
}

export interface FlagCategory {
	header: string,
	isNavigational: boolean,
	flags: NavigationalFlag[]
}

export const allFlags: FlagCategory[] = [
	{
		header: 'General flags',
		isNavigational: true,
		flags: [
			{letter: 'A', morse: '·-', name: 'Alpfa', icon: 'A', description: 'I have a diver down; keep well clear at slow speed.'},
			{letter: 'B', morse: '-···', name: 'Bravo', icon: 'B', description: 'I am taking in or discharging or carrying dangerous goods.'},
			{letter: 'C', morse: '-·-·', name: 'Charlie', icon: 'C', description: 'Affirmative.'},
			{letter: 'D', morse: '-··', name: 'Delta', icon: 'D', description: 'Keep clear of me; I am maneuvering with difficulty.'},
			{letter: 'E', morse: '·', name: 'Echo', icon: 'E', description: 'I am altering my course to starboard.'},
			{letter: 'F', morse: '··-·', name: 'Foxtrot', icon: 'F', description: 'I am disabled; communicate with me.'},
			{letter: 'G', morse: '--·', name: 'Golf', icon: 'G', description: 'I require a pilot or I am hauling nets (by fishing boats)'},
			{letter: 'H', morse: '····', name: 'Hotel', icon: 'H', description: 'I have a pilot on board.'},
			{letter: 'I', morse: '··', name: 'India', icon: 'I', description: 'I am altering my course to port.'},
			{letter: 'J', morse: '·---', name: 'Juliet', icon: 'J', description: 'I am on fire and have dangerous cargo on board: keep well clear of me. Or I am leaking dangerous cargo.'},
			{letter: 'K', morse: '-·-', name: 'Kilo', icon: 'K', description: 'I wish to communicate with you.'},
			{letter: 'L', morse: '·-··', name: 'Lima', icon: 'L', description: 'Stop immediately.'},
			{letter: 'M', morse: '--', name: 'Mike', icon: 'M', description: 'My vessel is stopped and making no way through the water.'},
			{letter: 'N', morse: '-·', name: 'November', icon: 'N', description: 'Negative.'},
			{letter: 'O', morse: '---', name: 'Oscar', icon: 'O', description: 'Man overboard.'},
			{letter: 'P', morse: '·--·', name: 'Papa', icon: 'P', description: ''},
			{letter: 'Q', morse: '--·-', name: 'Quebec', icon: 'Q', description: 'My vessel is healthy and I request free pratique.'},
			{letter: 'R', morse: '·-·', name: 'Romeo', icon: 'R', description: 'No ICS meaning as single flag. Prior to 1969: The way is off my ship; you may feel your way past me.'},
			{letter: 'S', morse: '···', name: 'Sierra', icon: 'S', description: 'I am operating astern propulsion.'},
			{letter: 'T', morse: '-', name: 'Tango', icon: 'T', description: 'Keep clear of me. Fishing boats: "Keep clear of me; I am engaged in pair trawling."'},
			{letter: 'U', morse: '··-', name: 'Uniform', icon: 'U', description: '"You are running into danger."'},
			{letter: 'V', morse: '···-', name: 'Victor', icon: 'V', description: '"I require assistance." '},
			{letter: 'W', morse: '·--', name: 'Whiskey', icon: 'W', description: '"I require medical assistance." '},
			{letter: 'X', morse: '-··-', name: 'X-ray', icon: 'X', description: '"Stop carrying out your intentions and watch for my signals." '},
			{letter: 'Y', morse: '-·--', name: 'Yankee', icon: 'Y', description: '"I am dragging my anchor." '},
			{letter: 'Z', morse: '--··', name: 'Zulu', icon: 'Z', description: '"I require a tug."By fishing vessels near fishing grounds: "I am shooting nets."'},
		]
	},
	{
		header: 'Numeric flags',
		isNavigational: true,
		flags: [
			{letter: '0', morse: '·----', name: 'Zero', icon: '0', description: 'Zero'},
			{letter: '1', morse: '··---', name: 'One', icon: '1', description: 'One'},
			{letter: '2', morse: '···--', name: 'Two', icon: '2', description: 'Two'},
			{letter: '3', morse: '····-', name: 'Three', icon: '3', description: 'Three'},
			{letter: '4', morse: '·····', name: 'Four', icon: '4', description: 'Four'},
			{letter: '5', morse: '-····', name: 'Five', icon: '5', description: 'Five'},
			{letter: '6', morse: '--···', name: 'Six', icon: '6', description: 'Six'},
			{letter: '7', morse: '---··', name: 'Seven', icon: '7', description: 'Seven'},
			{letter: '8', morse: '----·', name: 'Eight', icon: '8', description: 'Eight'},
			{letter: '9', morse: '-----', name: 'Nine', icon: '9', description: 'Nine'},				
		]
	},
	{
		header: 'National flags',
		isNavigational: false,
		flags: countries.map(country => ({
			name: country.name,
			icon: country.iso,
			iso: country.iso,
			code: country.code
		}))
	}
]

