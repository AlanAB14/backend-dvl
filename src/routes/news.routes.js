const express = require('express');
const { verificarToken } = require('../middleware/verificarToken.js');
const { getNews, getNewsPreview, getNew, updateNew, deleteNew, createNew } = require('../controllers/news.controller.js');

const router = express.Router();

router.get('/news', getNews);
router.get('/newsPreview', getNewsPreview);
router.get('/news/:id', getNew);
router.post('/news', verificarToken, createNew);
router.patch('/news/:id', verificarToken, updateNew);
router.delete('/news/:id', verificarToken, deleteNew);

module.exports = router;
