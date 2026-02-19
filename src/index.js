require('dotenv').config();

const express = require('express');
const app = express();
const methodOverride = require('method-override');

const { connectDB } = require('./config/db.js');
const productRoutes = require('./routes/productRoutes.js');
const productController = require('./controllers/productController');

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));


connectDB(); 

app.use(productRoutes);

// app.get('/', (productController.showProducts));
app.get('/', (req, res) => {
    res.redirect('/products');
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
});