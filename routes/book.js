const router = require('express').Router();
const bookController = require('./../controllers/book');

router.get('/', bookController.findAll);

router.get('/:id', bookController.findBook);

router.post('/', bookController.create);

router.put('/:id', bookController.updateBook);

router.delete('/:id', bookController.deleteBook);

module.exports = router;