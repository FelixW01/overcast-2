const pool = require('../db/config'); 

const categories = async () => {
    const query = `CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);`;

        try {
        // create the table
        await pool.query(query);
        console.log('Categories table present');
    } catch (err) {
        console.error('Could not create categories table: ', err);
    }
}

module.exports = { categories };