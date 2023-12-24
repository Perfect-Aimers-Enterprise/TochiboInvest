const Products = require('../models/products')
const getAllProducts = async (req, res) => {
    try {
        const products = await Products.find({})
        // console.log(products[0]._id);
        res.status(200).json(products)
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getProduct = async (req, res ) => {
    try {
        const {id:taskID} = req.params
        const products = await Products.findOne({_id:taskID})
        console.log(products);

        if(!products){
            return res.status(404).json({msg: `No product with ${taskID}`})
        }
        res.status(201).json(products)
    } catch (error) {
        console.error('Error fetching single products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createProduct = async (req, res ) => {
    try {
        // const imgs = `/TCHIBO1/${req.file.filename}`
        const {name, price, dailyIncome, days, totalIcome} = req.body
        // console.log('req.file:', req.file);
        // console.log('this is a req:', req);
        imageUrl = `/TCHIBO1/${req.file.filename}`
        const products = await Products.create({name, price, dailyIncome, days, totalIcome, imgs: imageUrl})
        res.status(201).json(products)
        console.log(products);
    } catch (error) {
        console.error('Error creating products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteProduct = async (req, res ) => {
    try {
        const {id:taskID} = req.params
        const products = await Products.findByIdAndDelete({_id:taskID})

        if(!products){
            return res.status(404).json({msg: `No product with ${taskID}`})
        }
        res.status(201).json(products)
    } catch (error) {
        console.error('Error deleting products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateProducts = async (req, res) => {
    try {
        const {id:taskID} = req.params
        const products = await Products.findByIdAndUpdate({_id:taskID}, req.body, {
            new: true,
            runValidators: true,
        })
        if(!products){
            return res.status(404).json({msg: `No product with ${taskID}`})
        }
        res.status(201).json(products);
    } catch (error) {
        console.error('Error Updating products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProducts
}