const express = require('express');
const { index, create, update, remove } = require('../controllers/ExpenseController');
const router = express.Router();

router.get('/', index);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
