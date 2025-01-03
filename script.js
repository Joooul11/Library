class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        this.read = !this.read;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(index) {
        this.books.splice(index, 1);
    }

    getBooks() {
        return this.books;
    }
}

class UI {
    constructor(library) {
        this.library = library;
        this.container = document.querySelector('.library-container');
        this.form = document.getElementById('book-form');
        this.newBookBtn = document.getElementById('new-book-btn');
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        this.newBookBtn.addEventListener('click', () => this.toggleForm());

        document.addEventListener('click', (e) => {
            if (!this.form.contains(e.target) && 
                !this.newBookBtn.contains(e.target) && 
                !this.form.classList.contains('hidden')) {
                this.toggleForm();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.form.classList.contains('hidden')) {
                this.toggleForm();
            }
        });
    }

    toggleForm() {
        this.form.classList.toggle('hidden');
    }

    handleSubmit(e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = parseInt(document.getElementById('pages').value);
        const read = document.getElementById('read').checked;

        const book = new Book(title, author, pages, read);
        this.library.addBook(book);
        this.renderBooks();
        this.form.reset();
        this.toggleForm();
    }

    renderBooks() {
        this.container.innerHTML = '';
        this.library.getBooks().forEach((book, index) => {
            const bookElement = this.createBookElement(book, index);
            this.container.appendChild(bookElement);
        });
    }

    createBookElement(book, index) {
        const div = document.createElement('div');
        div.classList.add('book-card');
        div.innerHTML = `
            <h3>${book.title}</h3>
            <p>by ${book.author}</p>
            <p>${book.pages} pages</p>
            <button class="toggle-read" data-index="${index}">
                ${book.read ? 'Read' : 'Not Read'}
            </button>
            <button class="remove-book" data-index="${index}">Remove</button>
        `;

        div.querySelector('.toggle-read').addEventListener('click', () => {
            book.toggleRead();
            this.renderBooks();
        });

        div.querySelector('.remove-book').addEventListener('click', () => {
            this.library.removeBook(index);
            this.renderBooks();
        });

        return div;
    }
}

const library = new Library();
const ui = new UI(library);


