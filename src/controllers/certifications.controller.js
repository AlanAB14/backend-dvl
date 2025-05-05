const { getPool } = require('../db.js');
const { SECRET_KEY } = require('../config.js');
const jwt = require('jsonwebtoken');

exports.getCertifications = async (req, res) => {
    try {
        const pool = await getPool();
        const [rows] = await pool.query('SELECT * FROM certifications');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.getCertification = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getPool();
        const [rows] = await pool.query('SELECT * FROM certifications WHERE id = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.createCertifications = async (req, res) => {
    let { date, title, img_preview, image, text } = req.body;

    try {
        const token = req.header('Authorization');
        if (!text || !date || !title || !img_preview || !image || !token) {
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
        const result = await pool.query('INSERT INTO certifications (date, title, img_preview, image, text, updated_by) VALUES (?, ?, ?, ?, ?, ?)', [date, title, img_preview, image, text, decoded.user_id]);
        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Policy not found'
        });

        const [rows] = await pool.query('SELECT * FROM certifications WHERE id = ?', [result[0].insertId]);
        res.send(rows[0]);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};

exports.updateCertifications = async (req, res) => {
    const { id } = req.params;
    let { date, title, img_preview, image, text } = req.body;

    try {
        // Validar token de autorización
        const token = req.header('Authorization');
        if (!token) {
            return res.status(400).json({ message: 'Faltan campos' });
        }

        const authorization = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(authorization, SECRET_KEY);

        // Verificar permisos
        if (decoded.role_id === 3) {
            return res.status(400).json({ message: 'El usuario no tiene privilegios para realizar la acción' });
        }

        // Formatear fecha si existe
        if (date) {
            // Si es una fecha válida la transformamos, si no, la dejamos nula
            const parsedDate = new Date(date);
            if (!isNaN(parsedDate)) {
                date = parsedDate.toISOString().slice(0, 19).replace('T', ' ');
            } else {
                date = null;
            }
        }

        const pool = await getPool();

        // Actualizar certificación
        const [result] = await pool.query(
            `UPDATE certifications 
             SET 
                date = IFNULL(?, date), 
                title = IFNULL(?, title), 
                img_preview = IFNULL(?, img_preview), 
                image = IFNULL(?, image), 
                text = IFNULL(?, text), 
                updated_by = IFNULL(?, updated_by)
             WHERE id = ?`,
            [date, title, img_preview, image, text, decoded.user_id, id]
        );

        // Si no se encontró ningún registro
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Certificación no encontrada' });
        }

        // Obtener la certificación actualizada
        const [rows] = await pool.query('SELECT * FROM certifications WHERE id = ?', [id]);

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Ocurrió un error inesperado',
            error: error.message
        });
    }
};



exports.deleteCertification = async (req, res) => {
    try {
        const pool = await getPool();
        const [result] = await pool.query('DELETE FROM certifications WHERE id = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Certification not found'
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        });
    }
};