const express = require('express');
const mainController = require('../controllers');

const router = express.Router();

router.post('/', mainController.main);

module.exports = router;
