const BooModel = require('./../models/Book');
const {verifyBook} = require("../validator/book");

module.exports = {
    create: (req, res) => {
        try {
            verifyBook(req.body);
            const newBook = new BooModel({
                name: req.body.name,
                description: req.body.description
            });
            newBook.save();
            res.status(201).send(newBook);
        } catch (error) {
            res.status(400).send({
                message: error.message || 'Something Wrong'
            });
        }
    },

    findAll: (req, res) => {
        BooModel
            .find()
            .then((books) => {
                res.send(books)
            })
            .catch((error) => {
                res.status(500).send({
                    message: error.message
                })
            })
    },

    findBook: (req, res) => {
        const bookId = req.params.id;
        BooModel.findById(bookId)
            .then((book) => {
                res.send(book);
            })
            .catch((error) => {
                res.status(500).send(error.message || `Cannot find book with id=${bookId}`)
            })
    },

    updateBook: async (req, res) => {
        const bookId = req.params.id;
        const book = await BooModel.findById(bookId);
        if (!book) {
            throw new Error('Cannot find book to update')
        }
        const newBook = {...book, ...req.body}

        verifyBook(newBook);
        const { name, description } = newBook;
        BooModel.findByIdAndUpdate(bookId, {
            name,
            description
        }, { new: true })
            .then((updateBook) => {
                res.send(updateBook)
            })
            .catch((error) => {
                res.status(500).send(error.message || `Cannot update book with id=${bookId}`)
            })
    },

    deleteBook: (req, res) => {
        const bookId = req.params.id;
        BooModel.findByIdAndDelete(bookId)
            .then(book => {
                res.send({
                    message: 'Book was successfully delete',
                })
            })
            .catch((error) => {
                res.status(500).send(error.message || `Cannot delete book with id=${bookId}`)
            })
    }

}