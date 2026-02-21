const Product = require('../models/Product.js');

const apiProductController = {
    getProducts: async (req, res) => {
        try {
            const { category } = req.query

            let products;

            if (category) {
                products = await Product.find({ category });
            } else {
                products = await Product.find();
            }

            return res.json(products);

        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: 'Server error' });
        }
    },
    getProductById: async (req, res) => {
        try {
            const { productId } = req.params;
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            return res.json(product);

        } catch (error) {
            console.error(error)
            return res.status(500).json('Server error')
        }
    },
    createProduct: async (req, res) => {
        try {
            const { name, description, image, category, size, price } = req.body;

            const product = await Product.create({
                name,
                description,
                image,
                category,
                size,
                price: Number(price),
            });
            
            return res.status(201).json(product);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error server' });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { productId } = req.params;
            const { name, description, image, category, size, price } = req.body;

            const updateData = {
                name,
                description,
                image,
                category,
                size,
                price: Number(price),
            };

            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                updateData,
                { new: true }
            );

            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            return res.json(updatedProduct);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Server error' });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const { productId } = req.params;
            const product = await Product.findByIdAndDelete(productId);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' })
            }

            return res.json({ message: 'Product deleted successfully', product });

        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: 'Server error' })
        }
    }
}

module.exports = apiProductController;