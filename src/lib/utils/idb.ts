import { dbStoresEnum } from "$lib/enums/db";

const dbName = 'judzeDB';
const dbVersion = 2;
const storeNames = Object.keys(dbStoresEnum);

let dbPromise: Promise<IDBDatabase> | null = null;

export function openDB() {
	if (dbPromise) return dbPromise;

	dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
		const request = indexedDB.open(dbName, dbVersion);
		
		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest)?.result;

			storeNames.forEach(storeName => {
				if (!db.objectStoreNames.contains(storeName)) {
					db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true })
				}
			})
		}

		request.onsuccess = (event) => {
			resolve((event.target as IDBOpenDBRequest)?.result);
		}

		request.onerror = (event) => {
			reject((event.target as IDBOpenDBRequest)?.error)
		}
	});
	
	return dbPromise;
}

export async function getAll<T>(storeName: string): Promise<T[]> {
	const db = await openDB();

	return new Promise((resolve, reject) => {
		const tx = db.transaction(storeName, 'readonly');
		const store = tx.objectStore(storeName);
		const request = store.getAll();

		request.onsuccess = (event) => resolve(request.result);
		request.onerror = (event) => reject(request.error);
	})
}

export async function addItem(storeName: string, item: any): Promise<IDBValidKey> {
	const db = await openDB();

	return new Promise((resolve, reject) => {
		const tx = db.transaction(storeName, 'readwrite');
		const store = tx.objectStore(storeName);
		const request = store.add(item);

		request.onsuccess = (event) => resolve(request.result);
		request.onerror = (event) => reject(request.error);
	})
}
