const express = require('express');
const { verificarToken } = require('../middleware/verificarToken.js');
const { getComments, updateComments } = require('../controllers/comments.controller.js');

const router = express.Router();

router.get('/comments', getComments);
router.patch('/comments/:id', verificarToken, updateComments);

module.exports = router;
