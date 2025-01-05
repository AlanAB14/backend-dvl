const { SECRET_KEY } = require('../config.js');
const { getPool } = require('../db.js');
const jwt = require('jsonwebtoken');

exports.getNews = async (req, res) => {
    try {
        const pool = await getPool();
        const [rows] = await pool.query('SELECT * FROM news');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.getNewsPreview = async (req, res) => {
    try {
        const pool = await getPool();
        const [rows] = await pool.query('SELECT id, img_preview, updated_by FROM news');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.getNew = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getPool();
        const [rows] = await pool.query('SELECT id, image, text, updated_by FROM news WHERE id = ?', [id]);
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.createNew = async (req, res) => {
    let { img_preview, image, text } = req.body;

    try {
        const token = req.header('Authorization');
        if (!text || !token) {
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
        const result = await pool.query('INSERT INTO news (img_preview, image, text, updated_by) VALUES (?, ?, ?, ?)', [img_preview, image, text, decoded.user_id]);
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'New not found'
        });

        const [rows] = await pool.query('SELECT * FROM news WHERE id = ?', [result[0].insertId]);
        res.send(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.updateNew = async (req, res) => {
    const { id } = req.params;
    let { img_preview, image, text } = req.body;

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
        const result = await pool.query('UPDATE news set img_preview = IFNULL(?, img_preview), image = IFNULL(?, image), text = IFNULL(?, text), updated_by = IFNULL(?, updated_by) WHERE id = ?', [img_preview, image, text, decoded.user_id, id]);
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Servicio not found'
        });

        const [rows] = await pool.query('SELECT * FROM news WHERE id = ?', [id]);

        res.send(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.deleteNew = async (req, res) => {
    try {
        const pool = await getPool();
        const [result] = await pool.query('DELETE FROM news WHERE id = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'New not found'
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};