import Book from "./book.js";

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
	books = initialBooks;

	constructor({ books = initialBooks }) {
		this.books = books;
	}

	getBooks() {
		return [...this.books];
	}

	addBookToLibrary(bookData) {
		const newBook = new Book(bookData);
		this.books = this.books.concat(newBook);

		return newBook;
	}

	deleteBook(bookId) {
		this.books = this.books.filter((book) => book.id !== bookId);
	}

	toggleReadStatus(bookId) {
		const book = this.books.find((b) => b.id === bookId);
		if (book) book.toggleReadStatus();
	}

	getBookById(id) {
		const book = this.books.find((b) => b.id === id);
		if (book) return book;
	}
}

export default Library;
