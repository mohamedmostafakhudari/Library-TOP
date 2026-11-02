import Book from "./book.js";

class Library {
	constructor(storage) {
		this.storage = storage;
		this.state = {
			books: [],
			isLoading: false,
			error: null,
		};
		this.observers = []; // used to notify the controller/view of changes
	}

	subscribe(observer) {
		this.observers.push(observer);
		return () => {
			this.observers = this.observers.filter((o) => o !== observer);
		};
	}

	notify() {
		const snapshot = this.getState();
		this.observers.forEach((observer) => observer(snapshot));
	}

	async fetchBooks() {
		this.state.isLoading = true;
		this.state.error = null;
		this.notify();

		try {
			const books = await this.storage.getAllBooks();
			this.state.books = books.map((book) => new Book(book));
		} catch (error) {
			this.state.error = error.message;
			throw error;
		} finally {
			this.state.isLoading = false;
			this.notify();
		}
	}

	getBooks() {
		return [...this.state.books];
	}

	getBookById(id) {
		const book = this.state.books.find((b) => b.id === id);
		if (book) return book;
	}

	async addBookToLibrary(bookData) {
		this.state.error = null;

		const newBook = new Book(bookData);

		// snapshot current state in case a rollback needed
		const previousState = [...this.state.books];

		// instantly update local state & trigger immediate render
		this.state.books = [...this.state.books, newBook];
		this.notify();

		try {
			await this.storage.saveBook(newBook);
		} catch (error) {
			this.state.error = error.message;
			// rolling back...
			this.state.books = previousState;
			this.notify();
			throw error; // let controller know so it can show an error toast
		}
	}

	async deleteBook(bookId) {
		this.state.error = null;
		// snapshot current state in case a rollback needed
		const previousState = [...this.state.books];

		// instantly update local state & trigger immediate render
		this.state.books = this.state.books.filter((book) => book.id !== bookId);
		this.notify();

		try {
			await this.storage.deleteBook(bookId);
		} catch (error) {
			this.state.error = error.message;
			// rolling back...
			this.state.books = previousState;
			this.notify();
			throw error; // let controller know so it can show an error toast
		}
	}

	async toggleReadStatus(bookId) {
		this.state.error = null;
		// snapshot current state in case a rollback needed
		const previousState = structuredClone(this.state.books);

		// instantly update local state & trigger immediate render
		let targetBook = null;

		this.state.books = this.state.books.map((b) => {
			if (b.id === bookId) {
				// creates a clone and keeps the prototype methods of the original book working for the clone aswell
				console.log(Object.getPrototypeOf(b));
				const clonedBook = Object.create(
					Object.getPrototypeOf(b),
					Object.getOwnPropertyDescriptors(b),
				);
				clonedBook.toggleReadStatus();
				targetBook = clonedBook; // keeps a reference for the storage save
				return clonedBook;
			}
			return b;
		});
		if (!targetBook) throw new Error("book not found");

		this.notify();

		try {
			await this.storage.saveBook(targetBook);
		} catch (error) {
			this.state.error = error.message;
			// rolling back...
			this.state.books = previousState;
			this.notify();
			throw error; // let controller know so it can show an error toast
		}
	}

	isLoading() {
		return this.state.isLoading;
	}

	hasError() {
		return this.state.error !== null;
	}

	getState() {
		return { ...this.state, books: [...this.state.books] };
	}
}

export default Library;
