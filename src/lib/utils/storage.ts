import { Preferences } from '@capacitor/preferences';
import { dateReviver } from './datetime';

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
	public async get<T>(key: string): Promise<T | null> {
		const encoded = await Preferences.get({ key });

		if (!encoded || encoded.value === null) {
			return null;
		}

		const { value, lifetime, createdAt }: StorageItem<T> = JSON.parse(encoded.value, dateReviver);

		if (lifetime && Date.now() - createdAt > lifetime) {
			await Preferences.remove({ key });

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
	public async set<T>(key: string, value: T, lifetime?: number): Promise<void> {
		await Preferences.set({
			key,
			value: JSON.stringify({
				value,
				lifetime,
				createdAt: Date.now()
			})
		});
	}

	public async remove(key: string): Promise<void> {
		await Preferences.remove({ key });
	}
}

export default new AppStorage();
