	import { browser } from "$app/environment";

	export type DocumentsCategoryType = {
		id: number;
		label: string;
	}

	export type DocumentType = {
		category: number;
		name: string;
		issueDate: Date;
		expiryDate: Date;
	}
	
	const documentsCategories = [
		{id: 0, label: 'Base'},
		{id: 1, label: 'Medical'},
		{id: 3, label: 'Training'}
	];

	const dbName = "documents";
	let db: IDBDatabase | undefined;
	
	if (browser) {
		const request = indexedDB.open(dbName, 1);
		
		request.onerror = (event) => {
			throw Error(`Error: ${event}`);
		};
	
		request.onsuccess = (event) => {
			db = (event.target as IDBOpenDBRequest)?.result as IDBDatabase;
		}
	
		request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
			const db = (event.target as IDBOpenDBRequest)?.result as IDBDatabase;
		
			const categoriesStore = db.createObjectStore('categories', { keyPath: 'id' });
			const transaction = categoriesStore.transaction;
			transaction.oncomplete = () => {
				console.log('transact')
				const documentsObjectStore = db
				.transaction('categories', 'readwrite')
				.objectStore('categories');
		
				documentsCategories.forEach((category) => {
					documentsObjectStore.add(category);
				});
			};
	
			db.createObjectStore('list', { autoIncrement: true });
		};
		
	}
	
	export function addRecordsToDB(store: string, data: object[]) {
		if (!db) {
			return;
		}

		const transaction = db.transaction(store, "readwrite");
		const objectStore = transaction.objectStore(store);
		
		data.forEach(row => {
			objectStore.add(row);
		});
		
		transaction.oncomplete = () => {
			console.log("Records added successfully");
			return true;
		};

		transaction.onerror = (error) => {
			throw new Error(`Error: ${error}`);
		}
	}

	export async function getDocuments(): Promise<{
		categories: DocumentsCategoryType[],
		list: DocumentType[]} | undefined>
	{
		if (!db) {
			return;
		}

		const transaction = db.transaction(['categories', 'list'], "readonly");
  
		const store1 = transaction.objectStore('categories');
		const items1Promise = new Promise(resolve => {
			const request = store1.getAll();
			request.onsuccess = () => resolve(request.result);
		});
		
		const store2 = transaction.objectStore('list');
		const items2Promise = new Promise(resolve => {
			const request = store2.getAll();
			request.onsuccess = () => resolve(request.result);
		});
		
		const [items1, items2] = await Promise.all([items1Promise, items2Promise]);
		
		return {
			['categories']: items1 as unknown as DocumentsCategoryType[],
			['list']: items2 as unknown as DocumentType[]
		};
	}