//=============================================================================
//Variables globales
//=============================================================================
const myLibrary = [];
const btFormBook = document.querySelector("#formBook");
const myModal = document.querySelector("dialog");
const btCloseModal = document.querySelector("#closeModal");
const btAddBook = document.querySelector("#addBook");
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const bookPages = document.querySelector("#bookPages");
const mainContent = document.querySelector(".main-container");
let myLastBook, newCard, myCard, newPara;

//=============================================================================
//Eventos para botones
//=============================================================================

//Botón que muestra modal
btFormBook.addEventListener("click", () => {
    myModal.showModal();
});

//Botón que cierra modal
btCloseModal.addEventListener("click", () => {
    myModal.close();
});

//Botón que arega un nuevo libro
btAddBook.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary(bookTitle.value, bookAuthor.value, bookPages.value);
});

//=============================================================================
//Constructor de libros
//=============================================================================
function Book(title, author, pages) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
}

//=============================================================================
//Funciones
//=============================================================================

//Crea un libro y lo agrega al arreglo myLibrary
function addBookToLibrary(bookTitle, bookAuthor, bookPages) {
    const addBook = new Book(bookTitle, bookAuthor, bookPages);

    myLibrary.push(addBook);
    myLastBook = myLibrary[myLibrary.length - 1]; //Último libro agregado
    displayBooks();
}

//Se crean dos libros de ejemplo
addBookToLibrary("Libro 1", "Autor 1", "255");
addBookToLibrary("Libro 2", "Autor 2", "255");
addBookToLibrary("Libro 3", "Autor 3", "255");
addBookToLibrary("Libro 4", "Autor 4", "255");

//Función que muestra los libros
function displayBooks() {
    createCard();
}

//Función que genera una nueva targeta
function createCard() {
    newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.setAttribute("data-id", myLastBook.id); //
    mainContent.appendChild(newCard);
    addCardElements();
}

//Función que agrega los elementos necesarios a la targeta
function addCardElements() {
    myCard = document.querySelector("[data-id='" + myLastBook.id + "']");
    const myBookInfo = document.createElement("div");
    const myBookOpt = document.createElement("div");
    const btDelBook = document.createElement("button");
    const btReadBook = document.createElement("button")

    myBookInfo.classList.add("book-info");
    myBookOpt.classList.add("book-opt");
    myCard.appendChild(myBookInfo);
    myCard.appendChild(myBookOpt);

    myBookInfoSel = document.querySelector("[data-id='" + myLastBook.id + "'] > .book-info");
    myBookOptSel = document.querySelector("[data-id='" + myLastBook.id + "'] > .book-opt");

    for (let i = 0; i <= 2; i++) {
        newPara = document.createElement("p");

        if (i === 0) {
            newPara.classList.add("title");
        } else if (i === 1) {
            newPara.classList.add("author");
        } else {
            newPara.classList.add("pages");
        }

        myBookInfoSel.appendChild(newPara);
    }

    btReadBook.setAttribute("id", "readBook");
    btReadBook.setAttribute("data-card", myLastBook.id);
    btReadBook.textContent = "Read";
    btDelBook.setAttribute("id", "deleteBook");
    btDelBook.setAttribute("data-card", myLastBook.id);
    btDelBook.textContent = "Delete";
    myBookOptSel.appendChild(btReadBook);
    myBookOptSel.appendChild(btDelBook);

    getCardInfo();

    //Botón que elimina el libro
    btDelBook.addEventListener("click", (e) => {
        const cardId = e.target.dataset.card; //obtiene el ID a partir del atributo "card" del conjunto "data"
        document.querySelector("[data-id='" + cardId + "']").remove(); //Elimina la targeta que coincide con ese ID
        
        //busca el índice del libro a eliminar a través de ID de la targeta
        const indToDel = myLibrary.findIndex(book => book.id === cardId); 
        myLibrary.splice(indToDel, 1); //Elimina el libro del arreglo
    });
}

//Agrega la información correspondiente a la targeta partir del id 
function getCardInfo() {
    myParaTitle = document.querySelector("[data-id='" + myLastBook.id + "'] > .book-info > .title");
    myParaAuthor = document.querySelector("[data-id='" + myLastBook.id + "'] > .book-info > .author");
    myParaPages = document.querySelector("[data-id='" + myLastBook.id + "'] > .book-info > .pages");

    myParaTitle.textContent = myLastBook.title
    myParaAuthor.textContent = myLastBook.author
    myParaPages.textContent = myLastBook.pages + " páginas"
}