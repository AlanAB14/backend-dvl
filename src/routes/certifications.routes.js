const express = require('express');
const { verificarToken } = require('../middleware/verificarToken.js');
const { getCertifications, getCertification, updateCertifications, createCertifications, deleteCertification } = require('../controllers/certifications.controller.js');

const router = express.Router();

router.get('/certifications', getCertifications);
router.get('/certifications/:id', getCertification);
router.patch('/certifications/:id', verificarToken, updateCertifications);
router.post('/certifications', verificarToken, createCertifications);
router.delete('/certifications/:id', verificarToken, deleteCertification);

module.exports = router;
