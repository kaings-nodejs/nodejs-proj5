const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getAuth);

router.post('/login', authController.postAuth);

module.exports = router;