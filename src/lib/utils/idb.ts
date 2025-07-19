import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store";

const dbName = 'judzeDB';
const dbVersion = 1;

export function openDB(): IDBDatabase | undefined {
	if (!browser) {
		return;
	}

	const request = indexedDB.open(dbName, dbVersion);
		
		request.onerror = (event) => {
			throw Error(`Error: ${event}`);
		};
	
		request.onsuccess = (event) => {
			return (event.target as IDBOpenDBRequest)?.result as IDBDatabase;
		}
	
		request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
			const db = (event.target as IDBOpenDBRequest)?.result as IDBDatabase;

			if (!db.objectStoreNames.contains('todos')) {
				db.createObjectStore('todos', { keyPath: 'id', autoIncrement: true });
			}

			if (!db.objectStoreNames.contains('documents')) {
				db.createObjectStore('documents', { keyPath: 'id', autoIncrement: true });
			}
		
			// const categoriesStore = db.createObjectStore('categories', { keyPath: 'id' });
			// const transaction = categoriesStore.transaction;

			// transaction.oncomplete = () => {
			// 	const documentsObjectStore = db
			// 	.transaction('categories', 'readwrite')
			// 	.objectStore('categories');
		
			// 	documentsCategories.forEach((category) => {
			// 		documentsObjectStore.add(category);
			// 	});
			// };
	
			// db.createObjectStore('list', { autoIncrement: true });
		};
}

export const db: Writable<IDBDatabase | undefined> = writable(openDB());
