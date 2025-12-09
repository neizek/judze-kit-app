import type { Writable } from "svelte/store";

export interface ValidatorResult<T> {
	readonly valid: boolean;
	readonly name: string;
	readonly message?: T | undefined;
}

export interface FormData {
	fields: {
		[name: string]: Field<any>
	};
	valid: boolean;
}

export interface FieldData<T> {
	errors: string[];
	valid: boolean;
	value: T;
	reference?: HTMLElement;
}

export interface FormSummary {
	readonly [fieldName: string]: any;
}

export interface EditableFormSummary {
	[fieldName: string]: any;
}

export interface Form extends Writable<FormData> {
	readonly validate: () => Promise<boolean>;
	readonly addField: <T>(field: Field<T>) => void;
	readonly removeField: (name: string) => void;
	readonly summary: () => FormSummary;
	readonly getField: <T>(name: string) => Field<T>;
	readonly getFields: () => Field<any>[];
	readonly getValue: <T>(name: string) => T;
	readonly getErrors: () => { [fieldName: string]: string[] };
	readonly setValidators: (...validators: Validator[]) => void;
	validators: Validator[];
}

export interface Field<T> extends Omit<Writable<FieldData<T>>, 'set'> {
	readonly name: string;
	validators: Validator[];
	readonly validate: () => Promise<boolean>;
	readonly set: (this: Field<T>, value: T) => void;
	readonly addValidator: (validator: Validator) => void;
	readonly setNewValidators: (validators: Validator[], validateNow?: boolean) => void;
	readonly deleteValidators: () => void;
}

export type Validator = (value: any, errorMessage?: string) => Promise<ValidatorResult<any>>;

export type CreateForm = (...fields: Field<any>[]) => Form;

export type CreateField = <T>(
	name: string,
	initial: T,
	initValidators: Validator[],
	reference?: HTMLElement,
) => Field<T>;


/**
 * createForm({
 * 		firstName: ['', [required(), min(2)]],
 * 		lastName: ['', [required(), min(3)]]
 * })
 */

export interface FormDescription {
	[ fieldName: string ]: [any, Validator[]]
}

export interface GyroErrorFormData {
	object: string,
	givenDateTime: Date,
	longitude: number,
	latitude: number,
	azimuth?: number,
	LHA?: number,
	GHA?: number,
	declination?: number,
	GC?: number,
	GB?: number,
	variation?: number,
	MC?: number,
	givenStarOrPlanet?: string,
}

export interface ETACalculationsFormData {
	departureDateTime: Date;
	departureTZ: number;
	arrivalDateTime: Date,
	arrivalTZ: number;
	averageSpeed: number;
	totalDistance: number;
}