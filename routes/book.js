const router = require('express').Router();
const bookController = require('./../controllers/book');

let books = [
    {
        id: 1,
        name: "Livre",
        description: "description"
    },
    {
        id: 2,
        name: "Livr2",
        description: "description2"
    }
]

router.get('/', (req, res ) => {
    res.send(books);
});

router.get('/:id', (req, res ) => {
    const bookId = +req.params.id
    const book = books.find(book => book.id === bookId);
    res.send(book);
});

router.post('/', bookController.create);

router.put('/', (req, res) => {
    const newBook = req.body;
    books = books.map((book) => {
        return book.id === newBook.id ? newBook : book
    })
    res.status(201).send(books);
})

router.delete('/', (req, res) => {
    const bookId = +req.params.id;
    books = books.filter(book => book.id !== bookId);
    res.status(204).send();
})

module.exports = router;