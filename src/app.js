// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import route modules
const indexRoutes = require('./routes/index.routes.js');
const usuariosRoutes = require('./routes/usuarios.routes.js');
const rolesRoutes = require('./routes/roles.routes.js');
const policiesRoutes = require('./routes/policies.routes.js');
const numbersUsRoutes = require('./routes/numbers-us.routes.js');
const newsRoutes = require('./routes/news.routes.js');
const infoUsRoutes = require('./routes/info-us.routes.js');
const commentsRoutes = require('./routes/comments.routes.js');
const certificationsRoutes = require('./routes/certifications.routes.js');
const contactsRoutes = require('./routes/contacts.routes.js');

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true, parameterLimit: 50000 }));

// Use route modules
app.use(indexRoutes);
app.use('/api', usuariosRoutes);
app.use('/api', rolesRoutes);
app.use('/api', rolesRoutes);
app.use('/api', policiesRoutes);
app.use('/api', numbersUsRoutes);
app.use('/api', newsRoutes);
app.use('/api', infoUsRoutes);
app.use('/api', commentsRoutes);
app.use('/api', certificationsRoutes);
app.use('/api', contactsRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint not found'
    });
});

module.exports = app;
