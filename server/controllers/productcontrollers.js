const pool = require('../db/config.js');


const getProducts = async (req, res) => {
    const { collectionId } = req.query;
    console.log(collectionId, '<<backend collectionid')
    try {
        const query = `SELECT *
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