function Book(title,author,numberOfPages,read){
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;
}

Book.prototype.info = function(){
    let readingStatu = this.read ? 'read' : 'not read yet';
    let info = `${this.title} by ${this.autor}, ${this.numberOfPages} pages, ${readingStatu}`
    return info;
}


const book1 = new Book('A Game of Thrones','George R. R. Martin',694,false);
const book2 = new Book('A Clash of Kings','George R. R. Martin',761,true);
let myLibrary = [book1,book2];


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
    


    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    rowDiv.append(readButton);
    rowDiv.append(deleteButton);

    card.append(rowDiv);

    const content = document.querySelector('.content');   
    content.append(card);

    


}

function displayAllBooks(myLibrary){
    for (const book of myLibrary){
       createBookCard(book);
    }
}


const overlayForm = document.querySelector('#overlayForm')
const addButton = document.querySelector('#addButton');
const submitButton = document.querySelector('#submitButton');

displayAllBooks(myLibrary);

addButton.addEventListener('click',()=>{
    overlayForm.style.display = "flex";
})





submitButton.addEventListener('click',()=>{
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let numberOfPages = document.querySelector('#pages').value;
    let read = document.querySelector('#read').checked;

    const newBook = new Book(title,author,numberOfPages,read);
    addBookToLibrary(newBook);

    overlayForm.style.display = "none";
    createBookCard(newBook);
    document.querySelector('#title').value ='';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
})










