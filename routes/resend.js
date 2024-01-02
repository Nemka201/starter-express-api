const express = require('express');
const router = express.Router();
const { Send } = require('../controllers/ResendController');

router.post('/send', Send);


module.exports = router;