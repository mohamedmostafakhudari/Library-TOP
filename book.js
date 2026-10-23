export default function Book({
	title,
	authors,
	pages,
	read = false,
	cover = null,
}) {
	if (!new.target) throw Error("'new' operator missing!");
	this.id = crypto.randomUUID();
	this.title = title;
	this.authors = authors;
	this.pages = pages;
	this.read = read;
	this.cover = cover;
	this.addedOn = new Date().toISOString();
}

Book.prototype.toggleReadStatus = function () {
	this.read = !this.read;
};
