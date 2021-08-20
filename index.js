const express = require("express");

// database

const Database = require("./database");

// initialization
const BookApp = express();

BookApp.get("/",(request, response)=>{
    response.json({
        message: "Server is working!!!",
    });
});

//-------------------------------------------------BOOK------------------------------------------------------------//

// Route  - /book
// Des    - To get all the books
// Access - Public
// Method - GET
// Params - none
// Body   - none

BookApp.get("/book", (req, res)=>{
    return res.json({
        books: Database.Book
    });
});

// Route  - /book/:bookID
// Des    - To get book based on ISBN
// Access - Public
// Method - GET
// Params - bookID
// Body   - none


BookApp.get("/book/:bookID",(req, res)=>{
    const getBook = Database.Book.filter((book) => book.ISBN === req.params.bookID);
    return res.json({
        book: getBook,
    });
});
// No two routes have same structure even they have different names of params like here /book/:category not valid


// Route  - /book/c/:category
// Des    - To get a list of books based on category
// Access - Public
// Method - GET
// Params - category
// Body   - none

BookApp.get("/book/c/:category", (req, res) => {
    const getBook = Database.Book.filter(
        (book) => book.category.includes(req.params.category)
    );
    return res.json({
        book: getBook,
    });
});


// TODO : STUDENT TASK
// Route  - /book/a/:author
// Des    - To get a list of books based on authors
// Access - Public
// Method - GET
// Params - author
// Body   - none

BookApp.get("/book/a/:author",(req,res)=>{
    const getBook = Database.Book.filter((book)=>{
        if(book.authors.includes(parseInt(req.params.author))){
            return book;
        }
    });
    return res.json({
        book: getBook,
    });
});



// ------------------------------------------------------ AUTHOR -----------------------------------------------------------------//


// Route  - /author
// Des    - To get all the authors
// Access - Public
// Method - GET
// Params - none
// Body   - none

BookApp.get("/author", (req, res)=>{
    return res.json({
        author: Database.Author
    });
});

// TODO : STUDENT TASK
// Route  - /author/:authorID
// Des    - To get specific author 
// Access - Public
// Method - GET
// Params - authorID
// Body   - none

BookApp.get("/author/:authorID",(req, res)=>{
    const getAuthor = Database.Author.filter((author) => author.id === parseInt(req.params.authorID));
    return res.json({
        author: getAuthor,
    });
});


// TODO : STUDENT TASK
// Route  - /author/b/:book
// Des    - To get list of author based on a book 
// Access - Public
// Method - GET
// Params - book
// Body   - none

BookApp.get("/author/b/:book",(req, res)=>{
    const getAuthor = Database.Author.filter((author) => {
        if(author.books.includes(req.params.book)){
            return author;
        }
    });
    return res.json({
        author: getAuthor,
    });
});


//------------------------------------------------PUBLICATIONS---------------------------------------------------------//

// TODO : STUDENT TASK

// Route  - /publication
// Des    - To get all the publication  
// Access - Public
// Method - GET
// Params - none
// Body   - none

BookApp.get("/publication", (req, res)=>{
    return res.json({
        publication: Database.Publication
    });
});

// TODO : STUDENT TASK

// Route  - /publication/:publicationID
// Des    - To get specific publication   
// Access - Public
// Method - GET
// Params - publicationID
// Body   - none

BookApp.get("/publication/:publicationID",(req, res)=>{
    const getPublication = Database.Publication.filter((publication) => publication.id === parseInt(req.params.publicationID));
    return res.json({
        publication: getPublication,
    });
});

// TODO : STUDENT TASK

// Route  - /publication/p/:book
// Des    - To get a list of publication based on a book   
// Access - Public
// Method - GET
// Params - book
// Body   - none


BookApp.get("/publication/p/:book",(req, res)=>{
    const getPublication = Database.Publication.filter((publication) => {
        if(publication.books.includes(req.params.book)){
            return publication;
        }
    });
    return res.json({
        publication: getPublication,
    });
});


BookApp.listen(4000,()=>{
    console.log("Server is running!!");
});