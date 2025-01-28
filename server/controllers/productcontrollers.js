const pool = require('../db/config.js');


const getProducts = async (req, res) => {
    const { collectionId } = req.query;

    try {

    if (!collectionId) {
        return res.status(400).json({ message: 'Collection ID is required' });
    }
    
        const query = `SELECT products.id, products.name, products.description, products.price, products.src, products.alt, products.link, products.category_id
            FROM products
            INNER JOIN collections ON products.collection_id = collections.id
            WHERE products.collection_id = ?
            ;`
        
        const  [results] = await pool.query(query, [collectionId]);

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