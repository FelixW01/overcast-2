const pool = require('../db/config'); 

const products = async () => {
    const query = `CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    collection_id INT,
    category_id INT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    image_src VARCHAR(255),
    image_alt VARCHAR(255),
    product_link VARCHAR(500),
    tag VARCHAR(255),
    FOREIGN KEY (collection_id) REFERENCES collections(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);`;

        try {
        // create the table
        await pool.query(query);
        console.log('product table present');
    } catch (err) {
        console.error('Could not create product table: ', err);
    }
}

module.exports = { products };