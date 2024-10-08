const BooModel = require('./../models/Book');
const {verifyBook} = require("../validator/book");

module.exports = {
    // requete POST / pour creer un Book
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

    // requete GET / pour recuperer l'ensemble des books
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

    // requete GET /:id pour récupere un book
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

    // requete PUT /:id mettre a jour un book
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

    // requete DELETE /:id Supprimer un book
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