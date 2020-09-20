//Array to store books
let bookshelf = [];

//References to DOM elements
const gridContainer = document.getElementById("grid-container");
const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const pagesInput = document.getElementById("pagesInput");
const readInput = document.getElementById("readInput");
const addButton = document.getElementById("addButton");

//Event listeners
addButton.addEventListener("click", () => {
    getBook();
    clearForm();
} );

//Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//Add a new book to the bookshelf
function addBook(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    const cardHeader = document.createElement("div");
    cardHeader.classList.add("cardHeader");
    const titlePara = document.createElement("p");
    titlePara.textContent = newBook.title;
    const authorPara = document.createElement("p");
    authorPara.textContent = newBook.author;
    const cardInfo = document.createElement("div");
    cardInfo.classList.add("cardInfo");
    const pagesPara = document.createElement("p");
    pagesPara.textContent = newBook.pages;
    const readPara = document.createElement("p");
    readPara.textContent = newBook.read;
    gridContainer.appendChild(newCard);
    newCard.appendChild(cardHeader);
    cardHeader.appendChild(titlePara);
    cardHeader.appendChild(authorPara);
    newCard.appendChild(cardInfo);
    cardInfo.appendChild(pagesPara);
    cardInfo.appendChild(readPara);
    bookshelf.push(newBook);
}

//Get the details of a book
function getBook() {
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.checked;
    addBook(title, author, pages, read);
}

//Clear the submission form
function clearForm() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;
}

