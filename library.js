import Book from "./book.js";
import * as storage from "./storage.js";

const initialBooks = [
	{
		title: "Don’t Make Me Think",
		authors: ["Steve Krug"],
		pages: 216,
		read: true,
		cover: null,
	},
	{
		title: "The Design of Everyday Things",
		authors: ["Don Norman"],
		pages: 368,
		read: false,
		cover: null,
	},
	{
		title:
			"Sprint: How to Solve Big Problems and Test New Ideas in Just Five Days",
		authors: ["Jake Knapp", "John Zeratsky", "Braden Kowitz"],
		pages: 288,
		read: false,
		cover: null,
	},
	{
		title: "You Don’t Know JS: Scope & Closures",
		authors: ["Kyle Simpson"],
		pages: 98,
		read: true,
		cover: null,
	},
	{
		title: "Rich Dad Poor Dad",
		authors: ["Robert T. Kiyosaki"],
		pages: 336,
		read: true,
		cover: null,
	},
	{
		title: "Learn UX: Design Great Products with Lean UX",
		authors: ["Jeff Gothelf"],
		pages: 240,
		read: false,
		cover: null,
	},
].map((bookData) => new Book(bookData));

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
	}

	notify() {
		this.observers.forEach((observer) => observer(this.state));
	}

	async fetchBooks() {
		this.state.isLoading = true;

		try {
			const data = await storage.getAllBooks();
			this.state.books = data;
			this.state.isLoading = false;

			return this.state.books;
		} catch (error) {
			this.state.error = error.message;
			this.state.isLoading = false;
			throw error;
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
		const newBook = new Book(bookData);

		// snapshot current state in case a rollback needed
		const previousState = [...this.state.books];

		// instantly update local state & trigger immediate render
		this.state.books.push(newBook);
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
		// snapshot current state in case a rollback needed
		const previousState = [...this.state.books];

		// instantly update local state & trigger immediate render
		const book = this.state.books.find((b) => b.id === bookId);

		if (!book) throw new Error("book not found");

		book.toggleReadStatus();
		this.notify();

		try {
			await this.storage.saveBook(book);
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
		return { ...this.state };
	}
}

export default Library;
