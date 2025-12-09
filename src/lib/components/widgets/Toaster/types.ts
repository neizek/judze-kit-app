	export interface Toast {
		id?: number,
		type: 'success' | 'error' | 'alert',
		text: string,
		timer?: number
	}