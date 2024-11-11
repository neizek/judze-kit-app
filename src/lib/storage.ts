export interface StorageItem<T> {
	value: T;
	/**
	 * In milliseconds.
	 */
	lifetime: number;
	/**
	 * Timestasmp in milliseconds.
	 */
	createdAt: number;
}

class AppStorage {
	public get<T>(key: string): T | null {
		const encoded = localStorage.getItem(key);

		if (!encoded) {
			return null;
		}

		const { value, lifetime, createdAt }: StorageItem<T> = JSON.parse(encoded);

		if (lifetime && Date.now() - createdAt > lifetime) {
			localStorage.removeItem(key);

			return null;
		}

		if (value === undefined) {
			return null;
		}

		return value;
	}

	/**
	 * @param key
	 * @param value
	 * @param lifetime in milliseconds.
	 */
	public set<T>(key: string, value: T, lifetime?: number): void {
		localStorage.setItem(
			key,
			JSON.stringify({
				value,
				lifetime,
				createdAt: Date.now()
			})
		);
	}

	public remove(key: string): void {
		localStorage.removeItem(key);
	}
}

export default new AppStorage();
