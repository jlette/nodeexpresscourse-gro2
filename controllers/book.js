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
    }


}