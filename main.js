//Array to store books
let bookshelf = [];

//References to DOM elements
const gridContainer = document.getElementById("grid-container");
const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const pagesInput = document.getElementById("pagesInput");
const readInput = document.getElementById("readInput");
const addButton = document.getElementById("addButton");
const clearButton = document.getElementById("clearButton");

//Event listeners
addButton.addEventListener("click", () => {
    getBook();
    clearForm();
} );

clearButton.addEventListener("click", clearForm);

//Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//Toggle whether a book has been read
Book.prototype.toggleRead = function () {
    this.read = !this.read;
    updateDisplay();
}

//Add a new book to the bookshelf
function addBook(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.setAttribute("data-index", bookshelf.length);
    const cardHeader = document.createElement("div");
    cardHeader.classList.add("cardHeader");
    const titlePara = document.createElement("p");
    titlePara.classList.add("titlePara");
    titlePara.textContent = newBook.title;
    const authorPara = document.createElement("p");
    authorPara.classList.add("authorPara");
    authorPara.textContent = newBook.author;
    const cardInfo = document.createElement("div");
    cardInfo.classList.add("cardInfo");
    const pagesPara = document.createElement("p");
    pagesPara.classList.add("pagesPara");
    pagesPara.textContent = newBook.pages;
    const readPara = document.createElement("p");
    readPara.classList.add("readPara");
    readPara.textContent = "Read? " + newBook.read;
    const readButton = document.createElement("button");

    //When the toggle read button is clicked, toggle whether the relevant book has been read
    readButton.addEventListener("click", (e) => {
        const index = e.target.parentElement.parentElement.getAttribute("data-index");
        bookshelf[index].toggleRead();
    });

    readButton.textContent = "Toggle read";
    gridContainer.appendChild(newCard);
    newCard.appendChild(cardHeader);
    cardHeader.appendChild(titlePara);
    cardHeader.appendChild(authorPara);
    newCard.appendChild(cardInfo);
    cardInfo.appendChild(pagesPara);
    cardInfo.appendChild(readPara);
    cardInfo.appendChild(readButton);
    bookshelf.push(newBook);
}

//Get the details of a book
function getBook() {
    const title = titleInput.value === "" ? "UNTITLED" : titleInput.value.toUpperCase();
    const author = authorInput.value === "" ? "Author unknown" : "By " + authorInput.value;
    const pages = pagesInput.value === "" ? "Pages: Unknown" : "Pages: " + pagesInput.value;
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

//Update the display of each card
function updateDisplay() {
    const cards = Array.from(document.getElementsByClassName("card"));
    cards.forEach(card => {
        index = card.getAttribute("data-index");
        if(!index) {
            return;
        }
        const titlePara = card.getElementsByClassName("titlePara");
        const authorPara = card.getElementsByClassName("authorPara");
        const pagesPara = card.getElementsByClassName("pagesPara");
        const readPara = card.getElementsByClassName("readPara");
        
        titlePara[0].textContent = bookshelf[index].title;
        authorPara[0].textContent = bookshelf[index].author;
        pagesPara[0].textContent = bookshelf[index].pages;
        readPara[0].textContent = bookshelf[index].read;
    })

}

