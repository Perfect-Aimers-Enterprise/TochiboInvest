const express = require('express')
const router = express.Router()
const {
    getAllacctDetails,
    getSingleacctDetails,
    createAllacctDetails,
    updateAllacctDetails,
    deleteAllacctDetails
} = require('../controllers/acc_controller')

router.route('/').get(getAllacctDetails).post(createAllacctDetails)
router.route('/:id').get(getSingleacctDetails).patch(updateAllacctDetails).delete(deleteAllacctDetails)

module.exports =  router