const pool = require('../db/config'); 

const collections = async () => {
    const query = `CREATE TABLE IF NOT EXISTS collections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    season ENUM('summer', 'fall', 'winter') NOT NULL
);`;

        try {
        // create the table
        await pool.query(query);
        console.log('Collections table present');
    } catch (err) {
        console.error('Could not create collections table: ', err);
    }
}

module.exports = { collections };