export default function Book({
	title,
	authors,
	pages,
	id = crypto.randomUUID(),
	addedOn = new Date().toISOString(),
	read = false,
	cover = null,
}) {
	if (!new.target) throw Error("'new' operator missing!");
	this.id = id;
	this.title = title;
	this.authors = authors;
	this.pages = pages;
	this.read = read;
	this.cover = cover;
	this.addedOn = addedOn;
}

Book.prototype.toggleReadStatus = function () {
	this.read = !this.read;
};
