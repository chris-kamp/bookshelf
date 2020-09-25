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

//Add button adds a book to the bookshelf and clears the form
addButton.addEventListener("click", () => {
    if(validateSubmission()) {
        addBook();
        clearForm();
    } else {
        titleInput.style.borderColor = "red";
    }
} );

//Validate the data in the submission form
function validateSubmission() {
    if(titleInput.value === "") {
        return false;
    } else {
        return true;
    }
}

//Clear button clears the form
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

//Limit pages field to numerical input
pagesInput.addEventListener("input", (e) => {
    const num = /[0-9]/;
    if(e.data && e.data.search(num) === -1) {
        e.target.value = e.target.value.slice(0, -1);
    }
})

//A utility function to create elements
function createElement(args) {
    const element = document.createElement(args.tag);

    if(args.hasOwnProperty("classes")) {
        args.classes.forEach(className => {
            element.classList.add(className);
        });
    }

    if(args.hasOwnProperty("attributes")) {
        args.attributes.forEach(attribute => {
            element.setAttribute(attribute.type, attribute.value);
        });
    }

    if(args.hasOwnProperty("textContent")) {
        element.textContent = args.textContent;
    }

    if(args.hasOwnProperty("eventListener")) {
        element.addEventListener(args.eventListener.type, args.eventListener.callback);
    }

    if(args.hasOwnProperty("parent")) {
        args.parent.appendChild(element);
    }

    return element;
}

//Create a new blank card
//Note the reference to bookshelf.length assumes the card is being created before the book that is associated with the card
//Indented to show element hierarchy
function createCard() {

    const newCard = createElement({
        tag: "div",
        classes: ["card"],
        attributes: [{
            type: "data-index",
            value: bookshelf.length
        }],
        parent: gridContainer
    });

        const deleteButton = createElement({
            tag: "button",
            classes: ["deleteButton"],
            textContent: "X",
            eventListener: {
                type: "click",
                callback: (e) => {
                    const index = e.target.getAttribute("data-index");
                    deleteBook(index);
                }
            },
            parent: newCard
        })

        const cardHeader = createElement({
            tag: "div",
            classes: ["cardHeader"],
            parent: newCard
        });

            const headerRow = createElement({
                tag: "div",
                classes: ["headerRow"],
                parent: cardHeader
            });

                const titlePara = createElement({
                    tag: "p",
                    classes: ["titlePara"],
                    parent: headerRow
                });

                const authorPara = createElement({
                    tag: "p",
                    classes: ["authorPara"],
                    parent: headerRow
                });

        const cardInfo = createElement({
            tag: "div",
            classes: ["cardInfo"],
            parent: newCard
        });

            const row1 = createElement({
                tag: "div",
                classes: ["cardRow"],
                parent: cardInfo
            });

                const pagesLabel = createElement({
                    tag: "span",
                    classes: ["pagesLabel"],
                    textContent: "Pages: ",
                    parent: row1
                });

                const pagesContent = createElement({
                    tag: "span",
                    classes: ["pagesContent"],
                    parent: row1
                });

            const row2 = createElement({
                tag: "div",
                classes: ["cardRow"],
                parent: cardInfo
            });

                const readLabel = createElement({
                    tag: "span",
                    classes: ["readLabel"],
                    textContent: "Status: ",
                    parent: row2
                });

                const readContent = createElement({
                    tag: "span",
                    classes: ["readContent"],
                    parent: row2
                });

            const buttonRow = createElement({
                tag: "div",
                classes: ["buttonRow"],
                parent: cardInfo
            });

                const readbutton = createElement({
                    tag: "button",
                    classes: ["readButton"],
                    textContent: "Toggle read",
                    eventListener: {
                        type: "click",
                        callback: (e) => {
                            const index = e.target.getAttribute("data-index");
                            bookshelf[index].toggleRead();
                            updateDisplay();
                        }
                    },
                    parent: buttonRow
                });

    const children = Array.from(newCard.querySelectorAll("*"));
    children.forEach(child => {
        child.setAttribute("data-index", bookshelf.length);
    });

}

//Clear the submission form
function clearForm() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;
    titleInput.style.borderColor = "black";
}

//Delete a book and its corresponding card
function deleteBook(index) {
    const deletedElements = document.querySelectorAll('[data-index="' + index + "\"");
    deletedElements.forEach(element => {
       element.parentNode.removeChild(element); 
    });
    bookshelf.splice(index, 1);
    const remainingCards = document.querySelectorAll(".card[data-index]");
    remainingCards.forEach(card => {
        const dataIndex = card.getAttribute("data-index");
        if(dataIndex > index) {
            card.setAttribute("data-index", (dataIndex - 1));
            const elements = card.querySelectorAll("*");
            elements.forEach(element => {
                element.setAttribute("data-index", (dataIndex - 1));
            });
        }
    });
}

//Update the display of each card
function updateDisplay() {
    const cards = Array.from(document.getElementsByClassName("card"));
    cards.forEach(card => {
        index = card.getAttribute("data-index");
        if(!index) {
            return;
        }
        const cardHeader = card.getElementsByClassName("cardHeader");
        const cardInfo = card.getElementsByClassName("cardInfo");
        const titlePara = card.getElementsByClassName("titlePara");
        const authorPara = card.getElementsByClassName("authorPara");
        const pagesContent = card.getElementsByClassName("pagesContent");
        const readContent = card.getElementsByClassName("readContent");
        
        titlePara[0].textContent = bookshelf[index].title === "" ? "UNTITLED" : bookshelf[index].title.toUpperCase();
        authorPara[0].textContent = bookshelf[index].author === "" ? "AUTHOR UNKNOWN" : "BY " + bookshelf[index].author.toUpperCase();
        if(bookshelf[index].title.length > 20) {
            titlePara[0].style.fontSize = "13px";
            authorPara[0].style.fontSize="11px";
        }
        pagesContent[0].textContent = bookshelf[index].pages === "" ? "Unknown" : bookshelf[index].pages;
        readContent[0].textContent = bookshelf[index].read ? "Read" : "Unread";

        if(bookshelf[index].read) {
            if(cardHeader[0].classList.contains("cardHeaderUnread")) {
                cardHeader[0].classList.remove("cardHeaderUnread");
            }
            if(!(cardHeader[0].classList.contains("cardHeaderRead"))) {
                cardHeader[0].classList.add("cardHeaderRead");
            }
            if(cardInfo[0].classList.contains("cardInfoUnread")) {
                cardInfo[0].classList.remove("cardInfoUnread");
            }
            if(!(cardInfo[0].classList.contains("cardInfoRead"))) {
                cardInfo[0].classList.add("cardInfoRead");
            }
        } else {
            if(cardHeader[0].classList.contains("cardHeaderRead")) {
                cardHeader[0].classList.remove("cardHeaderRead");
            }
            if(!(cardHeader[0].classList.contains("cardHeaderUnread"))) {
                cardHeader[0].classList.add("cardHeaderUnread");
            }  
            if(cardInfo[0].classList.contains("cardInfoRead")) {
                cardInfo[0].classList.remove("cardInfoRead");
            }
            if(!(cardInfo[0].classList.contains("cardInfoUnread"))) {
                cardInfo[0].classList.add("cardInfoUnread");
            }  
        }
    });
}

