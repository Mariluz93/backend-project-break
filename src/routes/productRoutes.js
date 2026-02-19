const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');
// const upload = require('../middlewaresBONUS/uploadCloudinaryMiddleware.js');
const uploadSingleImage = require('../middlewaresBONUS/uploadSingleImage.js')

router.get('/products', productController.showProducts);
router.get('/products/:productId', productController.showProductById);
router.get('/dashboard', productController.showDashboard);
router.get('/dashboard/new', productController.showNewProduct);
router.post('/dashboard', uploadSingleImage, productController.createProduct);
router.get('/dashboard/:productId/edit', productController.showEditProduct);
router.put('/dashboard/:productId', uploadSingleImage, productController.updateProduct);
router.delete('/dashboard/:productId/delete', productController.deleteProduct);
router.get('/dashboard/:productId', productController.showDashboardProductById)

module.exports = router;