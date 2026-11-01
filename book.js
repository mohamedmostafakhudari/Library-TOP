class Book {
	// Declare class fields (acts as documentation & default values)
	title;
	authors;
	pages;
	id = crypto.randomUUID();
	addedOn = new Date().toISOString();
	read = false;
	cover = null;

	constructor({
		title,
		authors,
		pages,
		id = crypto.randomUUID(),
		addedOn = new Date().toISOString(),
		read = false,
		cover = null,
	}) {
		// ES6 Classes would prevent calls with no 'new' keyword so no need to check
		this.id = id;
		this.title = title;
		this.authors = authors;
		this.pages = pages;
		this.read = read;
		this.cover = cover;
		this.addedOn = addedOn;
	}

	// public instance method defined in the prototype object of the Class function
	toggleReadStatus() {
		this.read = !this.read;
	}
}

export default Book;
