const BooModel = require('./../models/Book');

module.exports = {
    create: (req, res) => {
        const newBook = new BooModel({
            name: req.body.name,
            description: req.body.description
        });
        newBook.save();
        res.status(201).send(newBook);
    }


}