// Récupérer les livres depuis le localStorage
function getBooks() {
    return JSON.parse(localStorage.getItem('books')) || [];
}

// Sauvegarder les livres dans le localStorage
function saveBooks(books) {
    localStorage.setItem('books', JSON.stringify(books));
}

// Ajouter un livre
function addBook(book) {
    const books = getBooks();
    books.push(book);
    saveBooks(books);
    renderBooks();
}

// Mettre à jour un livre
function updateBook(index, updatedBook) {
    const books = getBooks();
    books[index] = updatedBook;
    saveBooks(books);
    renderBooks();
}

// Supprimer un livre
function deleteBook(index) {
    const books = getBooks();
    books.splice(index, 1);
    saveBooks(books);
    renderBooks();
}

// Afficher les livres
function renderBooks() {
    const books = getBooks();
    const booksList = document.getElementById('books-list');
    booksList.innerHTML = '';

    books.forEach((book, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
            <td>
                <button class="edit" onclick="editBook(${index})">Modifier</button>
                <button class="delete" onclick="deleteBook(${index})">Supprimer</button>
            </td>
        `;

        booksList.appendChild(row);
    });
}

// Fonction pour gérer le formulaire d'ajout
document.getElementById('book-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;

    if (title && author && year) {
        addBook({ title, author, year });
        document.getElementById('book-form').reset();
    }
});

// Fonction pour modifier un livre
function editBook(index) {
    const books = getBooks();
    const book = books[index];

    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('year').value = book.year;

    document.getElementById('book-form').onsubmit = function(e) {
        e.preventDefault();
        const updatedBook = {
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            year: document.getElementById('year').value
        };
        updateBook(index, updatedBook);
        document.getElementById('book-form').reset();
        document.getElementById('book-form').onsubmit = addNewBook;
    };
}

// Fonction pour ajouter un nouveau livre (pour réinitialiser le formulaire après une édition)
function addNewBook(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;

    if (title && author && year) {
        addBook({ title, author, year });
        document.getElementById('book-form').reset();
    }
}

// Initialiser le formulaire d'ajout
document.getElementById('book-form').onsubmit = addNewBook;

// Charger les livres au démarrage de l'application
renderBooks();
