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
    newCard.classList.add("book");
    const bookHeader = document.createElement("div");
    bookHeader.classList.add("bookHeader");
    const titlePara = document.createElement("p");
    titlePara.textContent = newBook.title;
    const authorPara = document.createElement("p");
    authorPara.textContent = newBook.author;
    const bookInfo = document.createElement("div");
    bookInfo.classList.add("bookInfo");
    const pagesPara = document.createElement("p");
    pagesPara.textContent = newBook.pages;
    const readPara = document.createElement("p");
    readPara.textContent = newBook.read;
    gridContainer.appendChild(newCard);
    newCard.appendChild(bookHeader);
    bookHeader.appendChild(titlePara);
    bookHeader.appendChild(authorPara);
    newCard.appendChild(bookInfo);
    bookInfo.appendChild(pagesPara);
    bookInfo.appendChild(readPara);
    bookshelf.push(newBook);
}