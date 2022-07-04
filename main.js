let myLibrary = [];
const overlayForm = document.querySelector('#overlayForm')
const addButton = document.querySelector('#addButton');
const submitButton = document.querySelector('#submitButton');
const form = document.querySelector('#form');
const content = document.querySelector('.content');


if(localStorage.getItem('books')){
    myLibrary=JSON.parse(localStorage.getItem('books'));
}

displayAllBooks(myLibrary);

addButton.addEventListener('click',()=>{
    overlayForm.style.display = "flex";
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let numberOfPages = document.querySelector('#pages').value;
    let read = document.querySelector('#read').checked;

    const newBook = new Book(title,author,numberOfPages,read);
    addBookToLibrary(newBook);
    setData(myLibrary);

    overlayForm.style.display = "none";
    createBookCard(newBook);
    document.querySelector('#title').value ='';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
})



content.addEventListener('click',(e)=>{
    if(e.target.classList.contains('del')){
        deleteElementFromLocal(e.target.parentElement.parentElement.getAttribute('data-id'));
        e.target.parentElement.parentElement.remove();
    }
})


function Book(title,author,numberOfPages,read){
    this.id = Date.now();
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;
}

function addBookToLibrary(Book) {
    myLibrary.push(Book);
}

function createBookCard(book){
    const card = document.createElement('div');
    card.classList.add('card')

    const title = document.createElement('p');
    title.classList.add('title');
    title.textContent = book.title;
    card.append(title);

    const author = document.createElement('p');
    author.textContent = "By: " + book.author;
    card.append(author);

    const numberOfPages= document.createElement('p');
    numberOfPages.textContent = "Number of Pages: " + book.numberOfPages; 
    
    const readButton = document.createElement('button');
    readButton.textContent = 'Read';
    readButton.classList.add('buttonCard');
    if(book.read === true){
        readButton.classList.add('activeButton');
    }
    readButton.addEventListener('click',()=>{
        readButton.classList.toggle('activeButton'); 
        book.read = true ? false : true;
    })

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('buttonCard');
    deleteButton.classList.add('del');
    
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    rowDiv.append(readButton);
    rowDiv.append(deleteButton);

    card.append(rowDiv);
    card.setAttribute('data-id',book.id);

    const content = document.querySelector('.content');   
    content.append(card);
}

function displayAllBooks(myLibrary){
    for (const book of myLibrary){
       createBookCard(book);
    }
}

function setData(myLibrary){
    window.localStorage.setItem("books",JSON.stringify(myLibrary));
}

function deleteElementFromLocal(book_id){
    let myNewLibrary = myLibrary.filter((book)=> book.id != book_id );
    setData(myNewLibrary);
}














