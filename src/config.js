const dotenv = require('dotenv');
dotenv.config();

// Exportar variables
// module.exports.PORT = 3000;
// module.exports.DB_USER = 'root';
// module.exports.DB_PASSWORD = '';
// module.exports.DB_HOST = 'localhost';
// module.exports.DB_DATABASE = 'dvl';
// module.exports.DB_PORT = 3306;

module.exports.PORT = 3001;
module.exports.DB_USER =  'admin';
module.exports.DB_PASSWORD =  'Admin123!';
module.exports.DB_HOST =  'localhost';
module.exports.DB_DATABASE =  'dvl';
module.exports.DB_PORT =  3306;


module.exports.SSH_HOST =  '181.117.6.178';
module.exports.SSH_PORT = 10022;
module.exports.SSH_USER = 'devweb';
module.exports.SSH_PASSWORD = 'DevweB3236*';
module.exports.LOCAL_PORT = 3306;
module.exports.SECRET_KEY = 'TokenDVL';