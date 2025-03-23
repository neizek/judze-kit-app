

	
	export type DocumentsCategoryType = {
		id: number;
		label: string;
		value: string;
	}
	
	const documentsCategories = [
		{id: 0, label: 'Base', value: 'base'},
		{id: 1, label: 'Medical', value: 'medical'},
		{id: 3, label: 'Training', value: 'training'}
	];
	
	const dbName = "documents";

	export function addRecordsToDB(store: string, data: object[]) {
		const request = indexedDB.open(dbName, 1);
		
		request.onsuccess = (event) => {
		  const db = (event.target as IDBOpenDBRequest)?.result;
		  const transaction = db.transaction(store, "readwrite");
		  const objectStore = transaction.objectStore(store);
		  
		  data.forEach(row => {
			objectStore.add(row);
		  });
		  
		  transaction.oncomplete = () => {
			console.log("Records added successfully");
		  };
		};
		
		request.onerror = (event) => {
		  console.error("Database error:", (event.target as IDBOpenDBRequest)?.error);
		};
	  }
	  

	function setDocumentsDB() {
		const request = indexedDB.open(dbName, 1);
		
		request.onerror = (event) => {
			console.log(`Error: ${event}`);
		};
		
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

	export function getCategories(): Promise<DocumentsCategoryType[]> {
		return new Promise((resolve, reject) => {
			const request = indexedDB.open(dbName, 1);
			
			request.onsuccess = (event) => {
				const db = (event.target as IDBOpenDBRequest)?.result;
				const transaction = db.transaction('categories', 'readonly');
				const objectStore = transaction.objectStore('categories');
				const request = objectStore.getAll();
	
				request.onsuccess = () => {
					// console.log("All records:", request.result);
					resolve(request.result);
				};
			};
			
			request.onerror = (event) => {
				console.error("Database error:", (event.target as IDBOpenDBRequest)?.error);
				reject("Error retrieving data: " + request.error);
			};
		});
	}

	export function initializeDocuments() {
		setDocumentsDB();
	}