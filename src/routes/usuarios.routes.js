const express = require('express');
const {
  // deleteUsuario,
  getUsuarios,
  // loginUsuario,
  // registerUsuario,
  // updateUsuario,
} = require('../controllers/usuarios.controller.js');
const { verificarToken } = require('../middleware/verificarToken.js');

const router = express.Router();

router.get('/usuarios', verificarToken, getUsuarios);
// router.post('/usuarios/register', registerUsuario);
// router.post('/usuarios/login', loginUsuario);
// router.patch('/usuarios/:id', verificarToken, updateUsuario);
// router.delete('/usuarios/:id', verificarToken, deleteUsuario);

module.exports = router;
