const config = require('./src/config.js');
const app = require('./src/app.js');
const { initDbConnection } = require('./src/db.js');

const { PORT } = config;

const startServer = async () => {
    try {
        await initDbConnection();
        app.listen(PORT, () => {
            console.log(`Server running on port ${ PORT }`);
        });
    } catch (error) {
        console.log('Error initializing database connection:', error);
        process.exit(1);
    }
};

startServer();


