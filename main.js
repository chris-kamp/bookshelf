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
    addBook();
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
function addBook() {
    createCard();
    getBook();
    updateDisplay();
}

//Get the details of a book
function getBook() {
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.checked;
    bookshelf.push(new Book(title, author, pages, read));
}

//Create a new blank card
//Note the reference to bookshelf.length assumes the card is being created before the book that is associated with the card
function createCard() {
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.setAttribute("data-index", bookshelf.length);

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("cardHeader");
    const headerRow = document.createElement("div");
    headerRow.classList.add("headerRow");
    const titlePara = document.createElement("p");
    titlePara.classList.add("titlePara");
    const authorPara = document.createElement("p");
    authorPara.classList.add("authorPara");
    const cardInfo = document.createElement("div");
    cardInfo.classList.add("cardInfo");
    const row1 = document.createElement("div");
    row1.classList.add("cardRow");
    const pagesLabel = document.createElement("span");
    pagesLabel.textContent = "Pages: ";
    const pagesContent = document.createElement("span");
    pagesContent.classList.add("pagesContent");
    const row2 = document.createElement("div");
    row2.classList.add("cardRow");
    const readLabel = document.createElement("span");
    readLabel.textContent = "Status: ";
    const readContent = document.createElement("span");
    readContent.classList.add("readContent");
    const buttonRow = document.createElement("div");
    buttonRow.classList.add("buttonRow");
    const readButton = document.createElement("button");
    readButton.classList.add("readButton");
    readButton.textContent = "Toggle read";
    //When the toggle read button is clicked, toggle whether the relevant book has been read
    readButton.addEventListener("click", (e) => {
        const index = e.target.parentElement.parentElement.parentElement.getAttribute("data-index");
        bookshelf[index].toggleRead();
    });
    gridContainer.appendChild(newCard);
    newCard.appendChild(cardHeader);
    cardHeader.appendChild(headerRow);
    headerRow.appendChild(titlePara);
    headerRow.appendChild(authorPara);
    newCard.appendChild(cardInfo);
    cardInfo.appendChild(row1);
    row1.appendChild(pagesLabel);
    row1.appendChild(pagesContent);
    cardInfo.appendChild(row2);
    row2.appendChild(readLabel);
    row2.appendChild(readContent);
    cardInfo.appendChild(buttonRow);
    buttonRow.appendChild(readButton);   
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
        const pagesContent = card.getElementsByClassName("pagesContent");
        const readContent = card.getElementsByClassName("readContent");
        
        titlePara[0].textContent = bookshelf[index].title === "" ? "UNTITLED" : bookshelf[index].title.toUpperCase();
        authorPara[0].textContent = bookshelf[index].author === "" ? "AUTHOR UNKNOWN" : "BY " + bookshelf[index].author.toUpperCase();
        pagesContent[0].textContent = bookshelf[index].pages === "" ? "Unknown" : bookshelf[index].pages;
        readContent[0].textContent = bookshelf[index].read ? "Read" : "Unread";
    });
}

