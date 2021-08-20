const express = require("express");

// database

const Database = require("./database");

// initialization
const BookApp = express();

// Specify which kind of data u want to send
BookApp.use(express.json());

BookApp.get("/",(request, response)=>{
    response.json({
        message: "Server is working!!!",
    });
});

//-------------------------------------------------BOOK------------------------------------------------------------//

        //----------------------------------------GET-----------------------------------------//

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

            // ------------------------------------------ POST REQUESTS -----------------------------------//

// Route  - /book/new
// Des    - To add a new book
// Access - Public
// Method - POST
// Params - none
// Body   - {request}
 
BookApp.post("/book/new",(req,res)=>{
    const { newBook } = req.body;
    Database.Book.push(newBook);

    return res.json( Database.Book)
});



        //----------------------------------------------PUT---------------------------------------------//

// Route  - /book/update/:isbn
// Des    - To update book details
// Access - Public
// Method - PUT
// Params - isbn
// Body   - {request}

BookApp.put("/book/update/:isbn",(req, res)=>{
    const {updateBook} = req.body;
    const { isbn } = req.params;

    const getBook = Database.Book.map((book) => {
        if(book.ISBN === isbn){
            return {...book, ...updateBook};
        }
        return book;
    });
    return res.json(getBook);
})

// Route  - /bookAuthor/update/:isbn
// Des    - To update book author and add it into author database
// Access - Public
// Method - PUT
// Params - isbn
// Body   - none


BookApp.put("/bookAuthor/update/:isbn",(req, res)=>{
    const {newAuthor} = req.body;
    const {isbn} = req.params;

    // Update Book Details
    const getBook = Database.Book.map((book)=>{
        if(book.ISBN === isbn){
            if(!book.authors.includes(newAuthor)){
                return book.authors.push(newAuthor);
            }
            return book;
        }
        return book;
    });

    // Update Author Database
    const getAuthor = Database.Author.map((author) => {
        if(author.id === newAuthor){
            if(!author.books.includes(isbn)){
                return author.books.push(isbn);
            }
            return author;
        }
        return author;
    });
    return res.json({book: getBook, author: getAuthor});
});



// Route  - /bookAuthor/update/:isbn
// Des    - To update title of the selected book
// Access - Public
// Method - PUT
// Params - isbn
// Body   - none

BookApp.put("/bookAuthor/update/:isbn",(req, res)=>{
    const {updatedBook} = req.body;
    const {isbn} = req.params;

    // Update Book Details
    const getBook = Database.Book.map((book)=>{
        if(book.ISBN === isbn){
            book.title = updatedBook.title;
            return book;
        }
        return book;
    });

    return res.json({book: getBook});
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

        //--------------------------------POST---------------------------------//

// Route  - /author/new
// Des    - To add new author
// Access - Public
// Method - POST
// Params - none
// Body   - none

BookApp.post("/author/new",(req, res)=>{
    const { newAuthor } = req.body;  // Curly braces tells from this request of body object i want to destructure it and from inside it i want to take the constant newAuthor and i want to save it in it.
                        // It is object inside object
    Database.Author.push(newAuthor);

    return res.json({
        message: "Author was added",
    })
});

        //--------------------------------------------PUT-------------------------------------------//


// TODO : STUDENT TASK
// Route  - /author/update/:id
// Des    - To update details of any author  
// Access - Public
// Method - PUT
// Params - id
// Body   - none

BookApp.put("/author/update/:id",(req, res)=>{
    const {updateAuthor} = req.body;
    const { id } = parseInt(req.params);

    const getAuthor = Database.Author.map((author) => {
        if(author.id === id){
            return {...author, ...updateAuthor};
        }
        return author;
    });
    return res.json(getAuthor);
})



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


        //-------------------------- POST----------------------------------------//


// Route  - /publication/new
// Des    - To add new Publication
// Access - Public
// Method - POST
// Params - none
// Body   - none

BookApp.post("/publication/new",(req, res)=>{
    const { newPublication } = req.body;  // Curly braces tells from this request of body object i want to destructure it and from inside it i want to take the constant newAuthor and i want to save it in it.
                        // It is object inside object
    Database.Publication.push(newPublication);

    return res.json({
        message: "Publication was added",
    })
});

        //------------------------------------------PUT-----------------------------------//

// TODO : STUDENT TASK
// Route  - /publication/update/:id
// Des    - To update details of any publication  
// Access - Public
// Method - PUT
// Params - id
// Body   - none

BookApp.put("/publication/update/:id",(req, res)=>{
    const {updatePublication} = req.body;
    const { id } = parseInt(req.params);

    const getPublication = Database.Author.map((publication) => {
        if(publication.id === id){
            return {...publication, ...updatePublication};
        }
        return publication;
    });
    return res.json(getPublication);
})


    


// Start the server with port 4000
BookApp.listen(4000,()=>{
    console.log("Server is running!!");
});