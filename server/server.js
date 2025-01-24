const express = require('express');
const dotenv = require('dotenv')
const routes = require('./routes');
const { products } = require('./schema/product')
const { categories } = require('./schema/categories')
const { collections } = require('./schema/collections')
require('./db/config');

dotenv.config();

categories();
collections();
products();

const app = express();
const PORT = process.env.PORT || 3000


app.use(express.json());
// Setup routes
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`)
})