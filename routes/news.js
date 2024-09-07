const express = require('express');
const router = express.Router();
const newsController = require('../controllers/NewsController.js');


router.get('/getAll', newsController.getAllNews);  
router.post('/create', newsController.createNews);
router.delete('/:id', newsController.deleteNews);

module.exports = router;
