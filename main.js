let bookshelf = [];
const gridContainer = document.getElementById("grid-container");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

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