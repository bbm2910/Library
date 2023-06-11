const login = document.querySelector(".btn-login");
const addBookBtn = document.querySelector(".add-btn");
const seeBooksBtn = document.querySelector(".all-books-btn");
const readBooksBtn = document.querySelector(".book-read-btn");
const unreadBooksBtn = document.querySelector(".book-unread-btn");
const deleteBtn = document.querySelectorAll(".delete-btn");
const closeFormButton = document.getElementById("closeFormBtn");
const overlay = document.getElementById("overlay");
const checkbox = document.querySelector(".checkbox");
const submitButton = document.querySelector(".btn-submit");

// Display and close the form to add more books
addBookBtn.addEventListener("click", function () {
    overlay.style.display = "flex";
});
closeFormButton.addEventListener("click", function () {
    overlay.style.display = "none";
});



// Add read-unread status to every book
const tableRows = document.querySelectorAll(".tb-books tr");

// Loop through each table row

//Show and hide and delete books
readBooksBtn.addEventListener("click", function () {
    tableRows.forEach((row) => {
        // Get the read status cell and value
        const readStatusCell = row.querySelector("td:nth-child(4)");
        const readStatus = readStatusCell.textContent;

        if (readStatus === "Unread") {
            row.classList.add("hide");
            row.classList.remove("show");
        } else if (readStatus === "Read") {
            row.classList.remove("hide");
            row.classList.add("show");
        }
    });
});
unreadBooksBtn.addEventListener("click", function () {
    tableRows.forEach((row) => {
        // Get the read status cell and value
        const readStatusCell = row.querySelector("td:nth-child(4)");
        const readStatus = readStatusCell.textContent;

        if (readStatus === "Read") {
            row.classList.add("hide");
            row.classList.remove("show");
        } else if (readStatus === "Unread") {
            row.classList.remove("hide");
            row.classList.add("show");
        }
    });
});
seeBooksBtn.addEventListener("click", function () {
    tableRows.forEach((row) => {
        // Get the read status cell and value
        row.classList.add("show");
    });
});


//Add books to the library
let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

}
function addBookToLibrary() {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let isRead = document.querySelector("#isRead").checked;

    let newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);

    addRowToTable(newBook, isRead);
}

const libraryTableBody = document.querySelector('.tb-books');

function addRowToTable(book, isRead) {
    const newRow = document.createElement('tr');

    const titleCell = document.createElement('td');
    titleCell.textContent = book.title;
    newRow.appendChild(titleCell);

    const authorCell = document.createElement('td');
    authorCell.textContent = book.author;
    newRow.appendChild(authorCell);

    const pagesCell = document.createElement('td');
    pagesCell.textContent = book.pages;
    newRow.appendChild(pagesCell);

    const readStatusCell = document.createElement("td");
    readStatusCell.textContent = isRead ? "Read" : "Unread";
    newRow.appendChild(readStatusCell);

    const deleteBtnCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtnCell.appendChild(deleteBtn);

    newRow.appendChild(deleteBtnCell);

    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
        // Get the parent row of the clicked button
        const row = deleteBtn.closest("tr");
        const rowIndex = Array.from(row.parentNode.children).indexOf(row);

        // Remove the row from the table
        row.remove();

        // Remove the book from the array
        myLibrary.splice(rowIndex, 1);
        console.log(myLibrary);
    });


    libraryTableBody.appendChild(newRow);
    // console.log(readStatusCell.textContent);
    deleteRow();
    colorStatus();

}

// Submit a new book to the library
submitButton.addEventListener("click", function () {
    event.preventDefault();
    addBookToLibrary();
    overlay.style.display = "none";
    console.log(myLibrary);
});

// Color the status of the books
function colorStatus() {
    const tableRows = document.querySelectorAll(".tb-books tr");

    tableRows.forEach((row) => {
        // Get the read status cell and value
        const readStatusCell = row.querySelector("td:nth-child(4)");
        const readStatus = readStatusCell.textContent;

        readStatusCell.classList.remove("read", "unread");

        if (readStatus === "Read") {
            readStatusCell.classList.add("read");
        }
        else if (readStatus === "Unread") {
            readStatusCell.classList.add("unread");
        }
    });
}
colorStatus();

function deleteRow() {
    deleteBtn.forEach((btn) => {
        btn.addEventListener("click", function () {
            // Get the parent row of the clicked button
            const row = btn.closest("tr");
            const rowIndex = Array.from(row.parentNode.children).indexOf(row);

            // Remove the row from the table and book from aray
            myLibrary.splice(rowIndex, 1);
            row.remove();
            console.log(myLibrary);
        });
    });
}
deleteRow()

login.addEventListener("click", function () {

    console.log(myLibrary);
});