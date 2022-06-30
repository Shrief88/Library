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

