const express = require('express')
const productController = require('../controllers/productController')


const router = express.Router()

router.post('/add-product/:firmId', productController.addProduct);
router.get('/:firmId/products', productController.getProductByFirm);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.headersSent('content-Type', 'image/jpeg');
    res.sendFile(path.join(_dirname, '..', 'uploads', imageName))
})

router.delete('/productID', productController.deleteProductByID)


module.exports = router;