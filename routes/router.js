const express = require('express')
const configuration = require('../configuration/multer')
const { getAllProducts
    ,getProduct,
    createProduct,
    deleteProduct,
    updateProducts } = require('../controllers/control')


const router = express.Router()

// router.use('/api/v1/products', upload)
const upload = configuration.upload

router.post('/upload', upload.single('image'), createProduct)
// router.post('/upload', createProduct);
router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').get(getProduct).patch(updateProducts).delete(deleteProduct)

module.exports = router