const { SECRET_KEY } = require('../config.js');
const { getPool } = require('../db.js');
const jwt = require('jsonwebtoken');

exports.getPolicies = async (req, res) => {
    try {
        const pool = await getPool();
        const [rows] = await pool.query('SELECT * FROM policies');
        res.json(rows);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.createPolicy = async (req, res) => {
    let { text } = req.body;

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
        const result = await pool.query('INSERT INTO policies (text, updated_by) VALUES (?, ?)', [text, decoded.user_id]);
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Policy not found'
        });

        const [rows] = await pool.query('SELECT * FROM policies WHERE id = ?', [result[0].insertId]);
        res.send(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.updatePolicies = async (req, res) => {
    const { id } = req.params;
    let { text } = req.body;

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
        const result = await pool.query('UPDATE policies set text = IFNULL(?, text), updated_by = IFNULL(?, updated_by) WHERE id = ?', [text, decoded.user_id, id]);
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Servicio not found'
        });

        const [rows] = await pool.query('SELECT * FROM policies WHERE id = ?', [id]);

        res.send(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.deletePolicy = async (req, res) => {
    try {
        const pool = await getPool();
        const [result] = await pool.query('DELETE FROM policies WHERE id = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Policy not found'
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};