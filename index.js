const port = process.env.PORT || 3000;
const host = '0.0.0.0';
require('dotenv').config();
const URI = process.env.URI;
const mongoose = require('mongoose');
const routes = require('./controllers/routes');
const path = require('path');
const Book = require('./model/book');
const bookController = require('./controllers/bookController')
const express = require('express'),
  app = express();
app.set(port);
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.set("view engine", "ejs");

app.use(express.json());
mongoose.connect(URI,{useUnifiedTopology: true});
const db = mongoose.connection;
db.once("open", () => {
  console.log("Mongoose Connected");
})
app.get("/home",
  bookController.getBook,
  (req, res, next) => {
    console.log(req.data);
    res.render("book",{books:req.data});
});

app.get("/books/:id", bookController.show, bookController.showView);

app.get("/AddNewBook", bookController.getNewBook);
app.post("/SubmitNewBook", bookController.saveNewBook);

app.get("/DeleteABook",
  bookController.getBook,
  (req, res, next) => {
    console.log(req.data);
    res.render("DeleteABook",{books:req.data});
});

app.get("/books/:id/delete", bookController.delete, 
    (req,res, next) => {
      console.log(req.data);
      res.render("/home",{books:req.data});
});

app.listen(process.env.PORT || 3000, host, () => {
  console.log('listening on port 3K');
});