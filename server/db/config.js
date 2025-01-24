const mysql = require('mysql2');
require('dotenv').config();

// Pool is a collection of connections, regular createConnection closes after each query
// While pool will be able to remain open and can be reused, making the application more
const jawsdbUrl = process.env.JAWSDB_URL;

let pool;

if (jawsdbUrl) {
    // We're on Heroku (JAWSDB_URL is set)
    const { URL } = require('url');
    const parsedUrl = new URL(jawsdbUrl);

    pool = mysql.createPool({
        host: parsedUrl.hostname,
        user: parsedUrl.username, 
        password: parsedUrl.password,
        database: parsedUrl.pathname.slice(1),
        port: parsedUrl.port || 3306,
    }).promise();
} else {
    // We're running locally (use local DB config from .env)
    pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    }).promise();
    // .promise() here enables async await when dealing with the pool
}

// ✅ Check Database Connection
async function checkDBConnection() {
    try {
        const [rows] = await pool.query('SELECT 1');
        console.log('Database Connected Successfully');
    } catch (error) {
        console.error('Database Connection Error:', error);
    }
}
checkDBConnection();

module.exports = pool;
