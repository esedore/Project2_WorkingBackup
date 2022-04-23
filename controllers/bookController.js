const Book = require('../model/book');
module.exports = { 
    getBook: (req, res, next)=>{
        Book.find({}, (error, books)=>{
            if (error) next(error);
            req.data = books;
            next();
        });
    },
    getDelete: (req, res, next)=>{
        Book.find({}, (error, books)=>{
            if (error) next(error);
            req.data = books;
            next();
        });
    },
    getNewBook: (req, res) => {
        res.render("AddNewBook");
    },
    saveNewBook: (req, res) => {
        let newBook = new Book({
            book: req.body.book,
            author: req.body.author,
            amazon: req.body.amazon,
        });
        newBook.save((error, result) => {
            if (error) res.send(error);
            res.render("SubmitNewBook")
        });
    },
    show: (req, res, next) => {
        let uid = req.params.id;
        Book.findById(uid)
            .then(book => {
                res.locals.book = book;
                    next();
            })
            .catch(err => {
                console.log("Error ${err.message}");
                next(err);
            });
    },
    showView: (req, res) => {
        res.render("show");
    },
    delete: (req, res, next) => {
        let uid = req.params.id;
        Book.findByIdAndRemove(uid)
            .then(() => {
                res.locals.redirect = "/DeleteABook";
                next();
            })
            .catch(err => {
                console.log("err deleting book by UID: ${err.message}");
                next();
            });
    },
};