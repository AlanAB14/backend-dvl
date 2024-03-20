const dotenv = require('dotenv');
dotenv.config();

// Exportar variables
module.exports.PORT = 3000;
module.exports.DB_USER = 'root';
module.exports.DB_PASSWORD = '';
module.exports.DB_HOST = 'localhost';
module.exports.DB_DATABASE = 'dvl';
module.exports.DB_PORT = 3306;

// module.exports.PORT = 3000;
// module.exports.DB_USER =  'sql10675693';
// module.exports.DB_PASSWORD =  '4gCfUss8ye';
// module.exports.DB_HOST =  'sql10.freesqldatabase.com';
// module.exports.DB_DATABASE =  'sql10675693';
// module.exports.DB_PORT =  3306;

module.exports.SECRET_KEY = 'TokenDVL';