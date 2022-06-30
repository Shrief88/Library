let myLibrary = [];

function Book(title,autor,numberOfPages,read){
    this.title = title;
    this.autor = autor;
    this.numberOfPages = numberOfPages;
    this.read = read;
}

Book.prototype.info = function(){
    let readingStatu = this.read ? 'read' : 'not read yet';
    let info = `${this.title} by ${this.autor}, ${this.numberOfPages} pages, ${readingStatu}`
    return info;
}

function addBookToLibrary(Book) {
    myLibrary.push(Book);
} 


function displayBooks(){
    myLibrary.map( book=> console.table(book));
}


const overlayForm = document.querySelector('#overlayForm')
const addButton = document.querySelector('#addButton');
const submitButton = document.querySelector('#submitButton');




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
    console.table(myLibrary);

})






