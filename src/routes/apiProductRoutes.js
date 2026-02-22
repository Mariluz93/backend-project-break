const express = require('express');
const router = express.Router();
const apiProductController = require('../controllers/apiProductController.js');
const apiAuthMiddleware = require('../middlewares/apiAuthMiddleware.js')

router.get('/products', apiProductController.getProducts)
router.get('/products/:productId', apiProductController.getProductById)
router.post('/products', apiAuthMiddleware, apiProductController.createProduct)
router.put('/products/:productId', apiAuthMiddleware, apiProductController.updateProduct)
router.delete('/products/:productId', apiAuthMiddleware, apiProductController.deleteProduct)

module.exports = router;