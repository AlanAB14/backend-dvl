const express = require('express');
const { verificarToken } = require('../middleware/verificarToken.js');
const { getInfo, updateInfoUs } = require('../controllers/info-us.controller.js');

const router = express.Router();

router.get('/infoUs', getInfo);
router.patch('/infoUs/:id', verificarToken, updateInfoUs);

module.exports = router;
