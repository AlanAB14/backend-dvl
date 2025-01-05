const { createPool } = require("mysql2/promise");
const { Client } = require("ssh2");
const {
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
    SSH_HOST,
    SSH_PORT,
    SSH_USER,
    SSH_PASSWORD,
    LOCAL_PORT
} = require('./config.js');

let sshClient = new Client();
let pool = null;

const initDbConnection = async () => {
  return new Promise((resolve, reject) => {
    if (pool) {
      return resolve(pool); // Si el pool ya está inicializado, devolvemos la promesa resuelta.
    }

    console.log("Iniciando conexión SSH...");

    sshClient.on("ready", () => {
      console.log("Conexión SSH lista.");

      sshClient.forwardOut(
        "127.0.0.1", // Dirección de salida del túnel
        0, // Puerto local
        DB_HOST, // Dirección de la base de datos
        DB_PORT, // Puerto de la base de datos
        (err, stream) => {
          if (err) {
            reject("Error al establecer el túnel SSH: " + err);
            return;
          }

          console.log("Túnel SSH establecido, creando el pool de la base de datos...");
          
          pool = createPool({
            host: "127.0.0.1",
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_DATABASE,
            port: LOCAL_PORT,
            stream: stream
          });

          resolve(pool); // Resolviendo la promesa cuando el pool se ha creado
        }
      );
    }).connect({
      host: SSH_HOST,
      port: SSH_PORT,
      username: SSH_USER,
      password: SSH_PASSWORD
    });
  });
};

// Función para obtener el pool de manera segura
const getPool = async () => {
  if (pool) {
    return pool;
  }
  return initDbConnection(); // Si el pool aún no está inicializado, lo inicializamos
};

module.exports = { getPool, initDbConnection };