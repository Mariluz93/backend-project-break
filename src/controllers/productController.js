const Product = require('../models/Product.js');
const baseHtml = require('../helpers/baseHtml.js');
const getNavBar = require('../helpers/getNavBar.js');
const template = require('../helpers/template.js');

const productController = {
    showProducts: async (req, res) => {
        try {
            const { category } = req.query;

            let products;

            if (category) {
                products = await Product.find({ category });
            } else {
                products = await Product.find();
            }

            const title = category ? `${category}` : "Productos";
            const content = getNavBar(req.session?.isAdmin) + template.productsList(products, title, false);

            res.send(baseHtml(content));

        } catch (error) {
            console.error(error)
            return res.status(500).send('Server error')
        }
    },
    createProduct: async (req, res) => {
        try {
            const { name, description, category, size, price } = req.body;

            if (!req.file || !req.file.path) {
                return res.status(400).send('Image missing')
            }

            await Product.create({
                name,
                description,
                image: req.file.path,
                category,
                size,
                price: Number(price)
            });
            return res.redirect('/products');

        } catch (error) {
            console.error(error);
            return res.status(500).send(error.message || 'Error creating product');
        }
    },
    showNewProduct: (req, res) => {
        const content = getNavBar(req.session?.isAdmin) + template.newProductForm();
        res.send(baseHtml(content));
    },
    showDashboard: async (req, res) => {
        try {
            const { category } = req.query;
            
            let products;

            if (category) {
                products = await Product.find({ category });
            } else {
                products = await Product.find();
            }

            const title = category ? `${category}` : "Dashboard";
            const content = getNavBar(req.session?.isAdmin) + template.productsList(products, title, true);

            res.send(baseHtml(content));

        } catch (error) {
            console.error(error)
            return res.status(500).send('Server error')
        }
    },
    showEditProduct: async (req, res) => {
        try {
            const { productId } = req.params;

            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).send('Product not found');
            }

            const content = getNavBar(req.session?.isAdmin) + template.editProductForm(product);
            return res.send(baseHtml(content));

        } catch (error) {
            console.error(error)
            return res.status(500).send('Server error')
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { productId } = req.params;
            const { name, description, category, size, price } = req.body;
            
            const updateData = {
                name,
                description,
                category,
                size,
                price: Number(price),
            }

            if (req.file && req.file.path) {
                updateData.image = req.file.path;
            }

            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                updateData,
                { new: true }
            );

            if (!updatedProduct) {
                return res.status(404).send('Product not found');
            }

            return res.redirect(`/dashboard/${updatedProduct._id}`);

        } catch (error) {
            console.error(error)
            return res.status(500).send(error.message || 'Server error')
        }
    },
    showProductById: async (req, res) => {
        try {
            const { productId } = req.params;
            const product = await Product.findById(productId);
    
            if (!product) {
                return res.status(404).send('Product not found')
            }
    
            const content = getNavBar(req.session?.isAdmin) + template.productDetail(product);
            res.send(baseHtml(content));
        } catch (error) {
            console.error(error)
            return res.status(500).send('Server error')
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const { productId } = req.params;
            const product = await Product.findByIdAndDelete(productId);
            
            if (!product) {
                return res.status(404).send('Product not found')
            }

            return res.redirect('/dashboard')

        } catch (error) {
            console.error(error)
            return res.status(500).send('Server error')
        }
    },
    showDashboardProductById: async (req, res) => {
        try {
            const { productId } = req.params;
            const product = await Product.findById(productId);
            
            if (!product) {
                return res.status(404).send('Product not found')
            }

            const content = getNavBar(req.session?.isAdmin) + template.dashboardProductDetail(product);
            res.send(baseHtml(content));

        } catch (error) {
            console.error(error)
            return res.status(500).send('Server error')
        }
    }
}

module.exports = productController;