const bookGrid = document.querySelector(".book-grid");

let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${isRead ? "finished reading" : "not read yet"}`
    }
}

function addBookToLibrary(title, author, pages, isRead) {
    myLibrary.push(new Book(title, author, pages, isRead));
}

function displayBook() {
    myLibrary.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookGrid.appendChild(bookCard); 
        const bookTitle = document.createElement("div");
        bookTitle.textContent = `Title: ${book.title}`;
        bookCard.appendChild(bookTitle);
        const bookAuthor = document.createElement("div");
        bookAuthor.textContent = `Author: ${book.author}`;
        bookCard.appendChild(bookAuthor);
        const bookPages = document.createElement("div");
        bookPages.textContent = `Number of pages: ${book.pages}`;
        bookCard.appendChild(bookPages);
        const bookStatus = document.createElement("div");
        bookStatus.textContent = `Status: ${book.isRead ? "Read" : "Not Read"}`;
        bookCard.appendChild(bookStatus);
    });
}