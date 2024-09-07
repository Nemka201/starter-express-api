const express = require('express');
const router = express.Router();
const newsController = require('./newsController'); 


// Obtener todas las noticias (paginación)
router.get('/', newsController.getLatestNews);

// Obtener una noticia por ID
router.get('/:id', newsController.getNewsById);

// Crear una nueva noticia
router.post('/', newsController.createNews);

// Eliminar una noticia por ID
router.delete('/:id', newsController.deleteNews);

// Buscar noticias por título o descripción
router.get('/search', newsController.searchNews);

module.exports = router;
module.exports = router;
