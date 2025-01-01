const mylibrary = []
function Book(title, author, pages, read) {
  this.title = title
  this.author = title
  this.pages = pages
  this.read = read
}

function addBookToLibrary(book) {
  mylibrary.push(book)
}

function displayBooks() {
    const libraryContainer = document.querySelector('.library-container');
    libraryContainer.innerHTML = ''; 

    mylibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <button class="read-toggle ${book.read ? 'read' : 'not-read'}">
                ${book.read ? 'Read' : 'Not Read'}
            </button>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;

        const readToggle = bookCard.querySelector('.read-toggle');
        readToggle.addEventListener('click', () => {
            book.read = !book.read;
            displayBooks();
        });

        const deleteBtn = bookCard.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            mylibrary.splice(index, 1);
            displayBooks();
        });

        libraryContainer.appendChild(bookCard);
    });
}

const form = document.getElementById('book-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  
  const newBook = new Book(title, author, pages, read);
  addBookToLibrary(newBook);
  displayBooks();
  form.reset();
});

const newBookBtn = document.createElement('button');
newBookBtn.textContent = 'New Book';
newBookBtn.addEventListener('click', () => {
  form.classList.toggle('hidden');
});
document.body.prepend(newBookBtn);


