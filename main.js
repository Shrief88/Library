class Book{
    constructor(title, author, numberOfPages, read) {
        this.id = Date.now();
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.read = read;
    }
}

function displayAllBooks(myLibrary){
    for (const book of myLibrary){
       createBookCard(book);
    }
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
    readButton.classList.add('read');
    if(book.read === true){
        readButton.classList.add('activeButton');
    }
    
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


const library = (()=>{
    let myLibrary = [];
    if(localStorage.getItem('books')){
        myLibrary=JSON.parse(localStorage.getItem('books'));
    }

    const getLibrary = ()=>{
        return myLibrary;
    }

    const addBookToLibrary = (Book)=>{
        myLibrary.push(Book);
    }

    const setData = (myLibrary)=>{

        window.localStorage.setItem("books",JSON.stringify(myLibrary));
    }

    const deleteElementFromLocal = (book_id)=>{
        let myNewLibrary = myLibrary.filter((book)=> book.id != book_id );
        setData(myNewLibrary);
        myLibrary = myNewLibrary;
    }

    return{ addBookToLibrary,setData,deleteElementFromLocal,getLibrary}
})();

const displayController = (()=>{
    const overlayForm = document.querySelector('#overlayForm')
    const addButton = document.querySelector('#addButton');
    const submitButton = document.querySelector('#submitButton');
    const form = document.querySelector('#form');
    const content = document.querySelector('.content');

    const myLibrary = library.getLibrary()
    displayAllBooks(myLibrary);

    overlayForm.addEventListener('click',(e)=>{
        if(e.target.getAttribute('id') === 'overlayForm'){
            overlayForm.style.display = "none";
        };
    })

    addButton.addEventListener('click',()=>{
        overlayForm.style.display = "flex";
    })

    form.addEventListener('submit',(e)=>{
        e.preventDefault(); //prevent the from submitting 
    
        let title = document.querySelector('#title').value;
        let author = document.querySelector('#author').value;
        let numberOfPages = document.querySelector('#pages').value;
        let read = document.querySelector('#read').checked;
    
        const newBook = new Book(title,author,numberOfPages,read);
        library.addBookToLibrary(newBook);
        library.setData(myLibrary);
    
        overlayForm.style.display = "none";

        createBookCard(newBook);

        document.querySelector('#title').value ='';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
    })

    content.addEventListener('click',(e)=>{
        if(e.target.classList.contains('del')){
            library.deleteElementFromLocal(e.target.parentElement.parentElement.getAttribute('data-id'));
            e.target.parentElement.parentElement.remove();
        }
    })

    content.addEventListener('click',(e)=>{
        if(e.target.classList.contains('read')){
            e.target.classList.toggle('activeButton');
            const index = e.target.parentElement.parentElement.getAttribute('data-id');
            myLibrary.find((book)=>{
               if(book.id == index){
                    book.read =  (book.read === true) ? false:true;
                    library.setData(myLibrary);
               }
            })
        }
    })
})();
























