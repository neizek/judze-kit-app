import type { CreateField, CreateForm, Field, FieldData, Form, FormData, FormSummary, Validator } from "$lib/types/forms";
import { get, type Writable, writable } from "svelte/store";

function isFieldData(value: any): boolean {
	if (
		!value ||
		typeof value !== 'object'
	) {
		return false;
	}

    const keys = Object.keys(value);

    return [
		'errors',
		'valid',
		'value',
		'reference'
	].every((key) => keys.includes(key));
}

export const validateField = async <T>(field: Field<T>): Promise<boolean> => {
	return Promise.all(field.validators.map(
		validator => validator(get(field).value)
	))
		.then(results => {
			let success = true;
			let errors: string[] = [];

			results.forEach(result => {
				if (result.valid) {
					return;
				}

				success = false;

				errors = [
					...errors,
					result.name
				];
			});

			field.update((state) => ({
				...state,
				errors,
				valid: success
			}));

			return success;
		});
}

export const createField: CreateField = <T>(
	name: string,
	value: T,
	validators: Validator[] = [],
	reference: HTMLElement | undefined = undefined
): Field<T> => {
	const store: Writable<FieldData<any>> = writable({
		errors: [],
		value,
		reference,
		valid: true
	});

	const { subscribe, update, set: _set } = store;

	let previousValue: T = value;

	return {
		subscribe,
		update,
		name,
		validators,
		set: function (this: Field<T>, value: T): void {
			const fieldData = get(this);
			
			if (isFieldData(value)) {
				const storeValue = value as FieldData<T>;
				const rawValue = storeValue.value;

				if (
					(rawValue !== previousValue)
					|| (Array.isArray(rawValue) && !arraysEqual(rawValue, previousValue as any[]))
				) {
					_set({
						...fieldData,
						value: rawValue
					});

					this.validate();
					previousValue = rawValue;
				}

				return;
			}

			if (
				(value !== previousValue)
				|| (Array.isArray(value) && !arraysEqual(value, previousValue as any[]))
			) {
				_set({
					...fieldData,
					value,
				});
	
				this.validate();
				previousValue = value;
			}
		},
		validate: async function(): Promise<boolean> {
			return validateField(this);
		},
		addValidator: function (this: Field<T>, validator: Validator): void {
			this.validators = [...this.validators, validator];
		},
		setNewValidators: function (this: Field<T>, validators: Validator[]): void {
			this.validators = [...validators];
		},
		deleteValidators: function (this: Field<T>): void {
			this.validators = [];
			this.update(current => {
				current.errors = [];
				current.valid = true;
				return current;
			})
		}
	};
}

function arraysEqual(one: any[], two: any[]): boolean {
	if (one.length !== two.length) {
		return false;
	}

	for (let i = 0; i < one.length; i++) {
		if (one[i] !== two[i]) {
			return false;
		}
	}

	return true;
}

export const createForm: CreateForm = (...fields: Field<any>[]) => ({
	...writable({
		fields: fields.reduce((total, field) => {
			return {
				...total,
				[field.name]: field
			};
		}, {}),
		valid: true,
	}),
	validate: async function (): Promise<boolean> {
		const store = get(this) as FormData;

		return Promise.all(
			Object.values(store.fields)
			.map(field => field.validate().then(() => field))
		).then(fields => fields.reduce((valid, field) => {
			if (!valid) {
				return false;
			}

			const fieldStore = get(field);

			if (!fieldStore.valid) {
				return false;
			}

			return true;
		}, true as boolean)).then(result => {
			this.update((formData) => ({
				...formData,
				valid: result
			}));

			return result;
		});
	},
	addField: function <T>(field: Field<T>) {
		this.update(state => ({
			...state,
			fields: {
				...state.fields,
				[field.name]: field
			}
		}));
	},
	removeField: function (name: string) {
		this.update(state => {
			const newFields = state.fields;

			delete newFields[name];

			return {
				...state,
				fields: newFields
			};
		});
	},
	getFields: function () {
		return Object.values(get(this).fields);
	},
	getField: function (name: string) {
		return get(this).fields[name];
	},
	getValue: function (name: string) {
		return get(get(this).fields[name]).value;
	},
	getErrors: function () {
		return this.getFields().reduce((errors, field) => {
			return {
				...errors,
				[field.name]: get(field).errors
			};
		}, {} as { [fieldName: string]: string[] });
	},
	summary: function (): FormSummary {
		let fields = get(this).fields;

		return Object.entries(fields).reduce((summary, [name, field]) => {
			return {
				...summary,
				[name]: get(field).value
			};
		}, {});
	},
	setValidators: function (this: Form, ...validators): void {
		this.validators = validators;
	},
	validators: []
});
