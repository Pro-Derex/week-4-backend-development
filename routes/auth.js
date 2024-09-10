const express = require('express');
const { auth } = require('../controllers/LoginController');
const { store } = require('../controllers/RegisterController');
const router = express.Router();

router.post('/login', auth);
router.post('/register', store);

module.exports = router;
