const { pool } = require('../db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config.js');

exports.getUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

// exports.registerUsuario = async (req, res) => {
//     const { user, password, super_admin } = req.body;
//     if (!user || !password || !super_admin) {
//         return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
//     }
//     try {
//         const [rowsUser] = await pool.query('SELECT * FROM usuarios WHERE user = ?', [user]);
//         if (rowsUser.length === 0) {
//             const hashPass = bcrypt.hashSync(password, 10);
//             const [rows] = await pool.query('INSERT INTO usuarios (user ,password, super_admin) VALUES (?, ?, ?)', [user, hashPass, super_admin]);
//             if (rows.insertId) {
//                 const token = jwt.sign({ user, super_admin }, SECRET_KEY, { expiresIn: '24h' });
//                 res.status(200).send({
//                     id: rows.insertId,
//                     token
//                 });
//             } else {
//                 return res.status(400).json({
//                     message: 'No se pudo registrar usuario'
//                 });
//             }
//         } else {
//             return res.status(400).json({
//                 message: 'El nombre de usuario ya existe'
//             });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: 'Something goes wrong'
//         });
//     }
// };

// exports.loginUsuario = async (req, res) => {
//     const { user, password } = req.body;
//     if (!user || !password) {
//         return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
//     }
//     try {
//         const [rowsUser] = await pool.query('SELECT * FROM usuarios WHERE user = ?', [user]);
//         if (rowsUser.length !== 0) {
//             const coincide = bcrypt.compareSync(password, rowsUser[0].password);
//             if (!coincide) {
//                 return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
//             }
//             const newUser = {
//                 user,
//                 super_admin: rowsUser[0].super_admin,
//                 id: rowsUser[0].id
//             };
//             const token = jwt.sign({ newUser }, SECRET_KEY, { expiresIn: '24h' });
//             res.status(200).json({ mensaje: 'Inicio de sesión exitoso', token });
//         } else {
//             return res.status(400).json({
//                 message: 'El usuario no existe'
//             });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: 'Something goes wrong'
//         });
//     }
// };

// exports.updateUsuario = async (req, res) => {
//     const { id } = req.params;
//     let { password, super_admin } = req.body;
//     try {
//         if (password) {
//             password = bcrypt.hashSync(password, 10);
//         }
//         const result = await pool.query('UPDATE usuarios set password = IFNULL(?, password), super_admin = IFNULL(?, super_admin) WHERE id = ?', [password, super_admin, id]);
//         if (result.affectedRows === 0) return res.status(404).json({
//             message: 'Servicio not found'
//         });

//         const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);

//         res.send(rows[0]);
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: 'Something goes wrong'
//         });
//     }
// };

// exports.deleteUsuario = async (req, res) => {
//     try {
//         const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
//         if (result.affectedRows <= 0) return res.status(404).json({
//             message: 'Servicio not found'
//         });

//         res.sendStatus(204);
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Something goes wrong'
//         });
//     }
// };
