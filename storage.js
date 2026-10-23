const DB_NAME = "library";
const STORE = "books";

function openDb() {
	return new Promise((resolve, reject) => {
		const req = indexedDB.open(DB_NAME, 1);
		req.onupgradeneeded = () => req.result.createObjectStore(STORE);
		req.onsuccess = () => resolve(req.result);
		req.onerror = () => reject(req.error);
	});
}

function promisify(request) {
	return new Promise((resolve, reject) => {
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export async function getAllBooks() {
	const db = await openDb();
	return promisify(db.transaction(STORE).objectStore(STORE).getAll());
}

export async function saveBook(book) {
	const db = await openDb();
	return promisify(
		db.transaction(STORE, "readwrite").objectStore(STORE).put(book),
	);
}

export async function deleteBook(id) {
	const db = await openDb();
	return promisify(
		db.transaction(STORE, "readwrite").objectStore(STORE).delete(id),
	);
}
