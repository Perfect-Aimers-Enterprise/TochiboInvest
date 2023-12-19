const acctDetails = require('../models/acc_details')

const getAllacctDetails = async (req, res) => {
    // res.send('All Accounts Gotten')
    try {
        const acctDetail = await acctDetails.find({})
        res.status(201).json(acctDetail)
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getSingleacctDetails = async (req, res) => {
    try {
        const {id:acctID} = req.params
        const acctDetail = await acctDetails.findOne({_id:acctID})
        
        if(!acctDetail) {
            return res.status(404).json({msg: `error getting account details`})
        }
        res.status(201).json(acctDetail)
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createAllacctDetails = async (req, res) => {
    // res.send('Account Created')
    try {
        const {accName, accNo, bankName} = req.body
        const acctDetail = await acctDetails.create({accName, accNo, bankName})
        if(!acctDetail) {
            return res.status(404).json({msg: `error creating account details`})
        }
        res.status(201).json(acctDetail)
        console.log(acctDetail);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateAllacctDetails = async (req, res) => {
    // res.send('Account Updated')
   try {
    const {id:acctID} = req.params 
    // const {acctName, acctNo, bankName} = req.body
    const acctDetail = await acctDetails.findByIdAndUpdate({_id:acctID}, req.body, {
        new: true,
        runValidators: true
    })
    if(!acctDetail) {
        return res.status(404).json({msg: `error updating account details`})
    }
    res.status(201).json(acctDetail)
   } catch (error) {
    console.error('Error updating account details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
   }
}

const deleteAllacctDetails = async (req, res) => {
    try {
        const {id:acctID} = req.params
        const acctDetail = await acctDetails.findByIdAndDelete({_id:acctID})
        if(!acctDetail) {
            return res.status(404).json({msg: `error deleting account details`})
        }
        res.status(201).json(acctDetail)
    } catch (error) {
        console.error('Error updating account details:', error);
        res.status(500).json({ error: 'Internal Server Error' })
    }

}

module.exports = {
    getAllacctDetails,
    getSingleacctDetails,
    createAllacctDetails,
    updateAllacctDetails,
    deleteAllacctDetails
}