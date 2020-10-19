class BookList {
	constructor(books) {
		this.books = books;

		this.booksCompleted = 0;
		this.booksNotCompleted = books.length;
		this.nextBookToRead = books[1];
		this.currentBook = books[0];
		this.prevBookCompleted = null;
	}

	addBook(newBook) {
		this.books.push(newBook);
		++this.booksNotCompleted;
		return this;
	}

	finishCurrentBook() {
		++this.booksCompleted;
		--this.booksNotCompleted;
		console.log(this.booksNotCompleted);
		if (!this.booksNotCompleted) {
			return alert(`BooksList is All Completed or Empty`);
		}
		this.currentBook.isCompleted = true;
		this.currentBook.readDate = new Date();
		this.prevBookCompleted = this.currentBook;
		this.currentBook = this.nextBookToRead;
		this.nextBookToRead = this.books[this.books.indexOf(this.currentBook) + 1];
		return this.currentBook;
	}
}

class Book {
	constructor(title, genre, author) {
		this.title = title;
		this.genre = genre;
		this.author = author;
		this.isCompleted = false;
		this.readDate = null;
	}
}

const book1 = new Book("HTML", "Programming", "Tinkal");
const book2 = new Book("CSS", "Programming", "Sonu");
const book3 = new Book("JS", "Programming", "Bharat");

const bookList1 = new BookList([book1, book2, book3]);

bookList1.finishCurrentBook();
console.log(bookList1);

const book4 = new Book("Node", "Programming", "Visahaka");

bookList1.addBook(book4);
console.log(bookList1);
