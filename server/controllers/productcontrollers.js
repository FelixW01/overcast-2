const pool = require('../db/config.js');

const getProducts = async (req, res) => {
    const { collection } = req.body;
    try {
        const query = `SELECT *
            FROM products
            INNER JOIN collections
            ON products.collection_id = ?
            ;`
        
        const  [results] = await pool.query(query, [collection]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.status(200).json({products: results})

    } catch (err) {
        console.log('Error fetching products', err);
        res.status(500).json({ message: 'Error fetching products' });
    }
}

module.exports = { getProducts }