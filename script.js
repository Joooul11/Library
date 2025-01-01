const mylibrary = []
function Book(title, author, pages, read) {
  this.title = title
  this.author = author
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
 

