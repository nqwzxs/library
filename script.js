const addBookButton = document.querySelector(".add-book-button");
const removeBookButton = document.querySelector(".remove-book-button");
const formCard = document.querySelector(".form-card");
const overlay = document.querySelector(".overlay");
const bookGrid = document.querySelector(".book-grid");

const addBookForm = document.querySelector(".add-book-form");
const submitButton = document.querySelector(".submit-button");

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

function displayBooks() {
    while (bookGrid.firstChild) {
        bookGrid.removeChild(bookGrid.firstChild);
    }

    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        const { title, author, pages, isRead } = book;
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookGrid.appendChild(bookCard);
        bookCard.innerHTML = `
        <div>Title: ${title}</div>
        <div>Author: ${author}</div>
        <div>Number of pages: ${pages}</div>
        ${isRead ? `<button class="button toggle-book-status-button active" onclick="toggleBookStatus(${i})">Read</button>` : 
        `<button class="button toggle-book-status-button" onclick="toggleBookStatus(${i})">Not Read</button>`}
        <button class="button remove-book-button" onclick="removeBook(${i})">Remove</button>`;
    };
};

function displayForm() {
    formCard.classList.add("active");
    overlay.classList.add("active");
}

addBookButton.addEventListener("click", displayForm);

function hideForm() {
    formCard.classList.remove("active");
    overlay.classList.remove("active");
}

overlay.addEventListener("click", hideForm)

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function toggleBookStatus(index) {
    const currentBook = myLibrary[index]; 
    currentBook.isRead = currentBook.isRead ? false : true;
    displayBooks();
}

submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const formData = new FormData(addBookForm);

    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const isRead = formData.getAll("isRead").includes('on');

    addBookToLibrary(title, author, pages, isRead);
    displayBooks();
    hideForm();
    addBookForm.reset();
});
