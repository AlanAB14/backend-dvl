const { getPool } = require('../db.js');
const { SECRET_KEY } = require('../config.js');
const jwt = require('jsonwebtoken');


exports.getComments = async (req, res) => {
    try {
        const pool = await getPool();
        const [rows] = await pool.query('SELECT * FROM comments');
        res.json(rows);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.updateComments = async (req, res) => {
    const { id } = req.params;
    let { stars, title, name, profession, avatar } = req.body;

    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(400).json({
                message: 'Faltan campos'
            });
        }
        
        var authorization = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(authorization, SECRET_KEY);
        if (decoded.role_id === 3) {
            return res.status(400).json({
                message: 'El usuario no tiene privilegios para realizar la acción'
            });
        }
        const pool = await getPool();
        const result = await pool.query('UPDATE comments set stars = IFNULL(?, stars), title = IFNULL(?, title), name = IFNULL(?, name), profession = IFNULL(?, profession), avatar = IFNULL(?, avatar), updated_by = IFNULL(?, updated_by) WHERE id = ?', [stars, title, name, profession, avatar, decoded.user_id, id]);
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Servicio not found'
        });
        const [rows] = await pool.query('SELECT * FROM comments WHERE id = ?', [id]);

        res.send(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};
