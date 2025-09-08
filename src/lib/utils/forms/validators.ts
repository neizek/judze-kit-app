import type { Field, Validator, ValidatorResult } from "$lib/types/forms";
import { get } from "svelte/store";

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const MOBILE_REGEX = /^(\+\d{1,3}[- ]?)?\d{10}$/;
const URL_PART_REGEX = /^[A-Za-z\-\_]+$/;

function isANumber(value: any): boolean {
	if (
		typeof value === 'number'
		|| typeof value === 'bigint'
	) {
		return true;
	}

	if (
		typeof value === 'string'
		&& value.length > 0
		&& !isNaN(Number(value))
	) {
		return true;
	}

	return false;
}

function isField(value: any): boolean {
	if (typeof value !== 'object') {
		return false;
	}

	const keys = Object.keys(value);

	return [
		'name',
		'validators',
		'validate',
		'set'
	].every((key) => keys.includes(key));
}

export const fieldsValidator = (): Validator => 
	async (elements: any): Promise<ValidatorResult<undefined>> => {
		if (!Array.isArray(elements)) {
			return {
				valid: false,
				name: 'not_an_array'
			}
		}

		for (const element of elements) {
			if (!isField(element)) {
				return {
					valid: false,
					name: 'not_a_field'
				};
			}

			const field = element as Field<any>;
			await field.validate();

			if (!get(field).valid) {
				return {
					valid: false,
					name: 'invalid_field'
				};
			}

		}
		
		return {
			valid: true,
			name: ''
		};
	}

export const formsValidator = (): Validator => async (forms): Promise<ValidatorResult<undefined>> => {
	if (
		!forms
		|| typeof forms !== 'object'
		|| !Array.isArray(forms)
	) {
		return {
			valid: false,
			name: 'not_an_array'
		}
	}

	return Promise.all(forms.map(form => form.validate()))
		.then(valids => valids.reduce((validatorResult, valid) => {
			if (!validatorResult.valid) {
				return validatorResult;
			}

			if (!valid) {
				return {
					valid: false,
					name: 'invalid_nested_form'
				};
			}

			return validatorResult;
		}, {valid: true, name: 'invalid_nested_form'} as ValidatorResult<undefined>));
}

export const isEmail = (): Validator => async (value): Promise<ValidatorResult<undefined>> => {
	if (
		!value
		|| typeof value !== 'string'
		|| !value.match(EMAIL_REGEX)
	) {
		return {
			valid: false,
			name: 'invalidMail'
		};
	}

	return {
		valid: true,
		name: 'invalidMail'
	};
}

export const regex = (RegExp: RegExp): Validator => async (value): Promise<ValidatorResult<undefined>> => {
	if (
		!value
		|| typeof value !== 'string'
		|| !value.match(RegExp)
	) {
		return {
			valid: false,
			name: 'invalidRegex'
		};
	}

	return {
		valid: true,
		name: 'invalidRegex'
	};
}

export const mobile = (): Validator => async (value): Promise<ValidatorResult<undefined>> => {
	if (
		!value
		|| typeof value !== 'string'
		|| !value.match(MOBILE_REGEX)
	) {
		return {
			valid: false,
			name: 'invalidMobileNumber'
		};
	}

	return {
		valid: true,
		name: 'invalidMobileNumber'
	};
}

export const matchField = <T>(field: Field<T>): Validator => async (value): Promise<ValidatorResult<undefined>> => {
	if (value !== get(field).value) {
		return {
			valid: false,
			name: 'match_field'
		};
	}

	return {
		valid: true,
		name: 'match_field'
	};
}

export const urlPart = (): Validator => async (value): Promise<ValidatorResult<undefined>> => {
	if (
		!value
		|| typeof value !== 'string'
		|| !value.match(URL_PART_REGEX)
	) {
		return {
			valid: false,
			name: 'url_part'
		};
	}

	return {
		valid: true,
		name: 'url_part'
	};
}

export const required = (errorMessage?: string): Validator => async (value): Promise<ValidatorResult<undefined>> => {
	console.log(value);
	if (isANumber(value)) {
		return {
			valid: !isNaN(value),
			name: errorMessage ?? 'required'
		};
	}
	
	if (
		!value
		|| (typeof value === 'object' && Object.keys(value).length <= 0)
		|| (typeof value === 'string' && value.length <= 0)
	) {
		return {
			valid: false,
			name: errorMessage ?? 'required'
		};
	}

	return {
		valid: true,
		name: errorMessage ?? 'required'
	}
}

/**
 * @param compareTo 
 * @param compareWith 
 * @param more if true, compare if compareTo more than compareWith,
 * otherwhise less than.
 * @param including 
 */
const compare = (
	compareTo: number,
	compareWith: number,
	more: boolean,
	including: boolean
): boolean => {
	if (more) {
		return including ? compareTo >= compareWith : compareTo > compareWith;
	}

	return including ? compareTo <= compareWith : compareTo < compareWith;
}

export const min = (
	minimum: number,
	including: boolean = true
): Validator => async (value): Promise<ValidatorResult<undefined>> => {
	if (
		!value
		|| (typeof value === 'object' && compare(
			Object.keys(value).length,
			minimum,
			false,
			including
		))
		|| (typeof value === 'string' && compare(
			value.length,
			minimum,
			false,
			including
		))
	) {
		return {
			valid: false,
			name: 'min'
		}
	}

	return {
		valid: true,
		name: 'min'
	};
}

export const max = (
	maximum: number,
	including: boolean = true
): Validator => async (value): Promise<ValidatorResult<undefined>> => {
	if (!value) {
		return {
			valid: true,
			name: 'max'
		};
	}

	if (
		(typeof value === 'object' && compare(
			Object.keys(value).length,
			maximum,
			true,
			including
		))
		|| (typeof value === 'string' && compare(
			value.length,
			maximum,
			true,
			including
		))
	) {
		return {
			valid: false,
			name: 'max'
		}
	}

	return {
		valid: true,
		name: 'max'
	};
}

export const numeric = (): Validator => async (value): Promise<ValidatorResult<undefined>> => {
	if (!isANumber(value)) {
		return {
			valid: false,
			name: 'numeric'
		};
	}

	return {
		valid: true,
		name: 'numeric'
	};
}
