const express = require('express');
const { verificarToken } = require('../middleware/verificarToken.js');
const { getPolicies, updatePolicies, createPolicy, deletePolicy } = require('../controllers/policies.controller.js');

const router = express.Router();

router.get('/policies', getPolicies);
router.post('/policies',verificarToken, createPolicy);
router.patch('/policies/:id',verificarToken, updatePolicies);
router.delete('/policies/:id',verificarToken, deletePolicy);


module.exports = router;
