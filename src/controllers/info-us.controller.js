const { SECRET_KEY } = require('../config.js');
const { getPool } = require('../db.js');
const jwt = require('jsonwebtoken');

exports.getInfo = async (req, res) => {
    try {
        const pool = await getPool();
        const [rows] = await pool.query('SELECT * FROM info_us');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.updateInfoUs = async (req, res) => {
    const { id } = req.params;
    let { title, subtitle, image, text } = req.body;

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
        const result = await pool.query('UPDATE info_us set title = IFNULL(?, title), subtitle = IFNULL(?, subtitle), image = IFNULL(?, image), text = IFNULL(?, text), updated_by = IFNULL(?, updated_by) WHERE id = ?', [title, subtitle, image, text, decoded.user_id, id]);
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Info not found'
        });

        const [rows] = await pool.query('SELECT * FROM info_us WHERE id = ?', [id]);

        res.send(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};