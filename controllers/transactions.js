const withdrawalsLogModel = require("../models/withdrawal.js");
const depositsLogModel = require("../models/deposit");
const financialSummaryModel = require("../models/financialSummary.js");
const financialSummary = require("../models/financialSummary.js");
const adminWithReqModel = require("../models/adminWiths");


const BadRequest = require("../errors/badRequest.js");
const userModel = require("../models/User.js");

async function adminWithReq (withReq, userID, requestID){
    const user = await userModel.findById(userID);
    const email = user.email;
    let withData = { ...withReq, email, _id:requestID, userID };
    const result = await adminWithReqModel.create(withData);
    console.log("again");
    console.log(result);

}

const reqWithwithdrawal = async (req, res)=>{
    const { userID } = req.user;
    const withdrawalsLog = await withdrawalsLogModel.findById(userID);
    const withdrawalsArray = withdrawalsLog.withdrawals;
    withdrawalsArray.push(req.body);
    const result = await withdrawalsLogModel.findOneAndUpdate(
        { _id: userID },
        { withdrawals:withdrawalsArray }, 
        { new:true }
        );
    console.log(result);
    const requestID = result.withdrawals.pop()._id;
    await adminWithReq(req.body, userID, requestID);
    res.status(200).json({ msg:"withdrawal request has been submitted successfully", status:"successfull" });
}


const deposit = async (req, res)=>{
    const { id } = req.user;
    const depositsLog = await depositsLogModel.findById(id);
    const depositsArray = depositsLog.deposits;
    depositsArray.push(req.body);
    await depositsLog.updateOne({ withdrawals:depositsArray });
    res.status(200).json({ msg:"Deposit request has been submitted successfully", status:"success" });
}

const confirmWithdrawal = async(req, res)=>{
    const { userID, requestID } = req.body;
    console.log(req.body);

    const userWithReqDoc = await withdrawalsLogModel.findById(userID);
    console.log(userID)
    console.log(userWithReqDoc)
    let userWithdrawalReqsArray = userWithReqDoc.withdrawals;
    userWithdrawalReqsArray = userWithdrawalReqsArray.map((request)=>{
        if(request._id==requestID){
            return request = { ...request, status:"successful" };
        }
        return request;
    })

    await userWithReqDoc.updateOne( {
        withdrawals: userWithdrawalReqsArray
    });

    const adminwithReq = await adminWithReqModel.deleteOne({ _id:requestID });
    // const withdrawalsArray = withdrawalsLog.withdrawals;
    // withdrawalsArray[requestId]={...withdrawalsArray[requestId], status:"successful"};
    // await withdrawalsLog.updateOne({ withdrawals:withdrawalsArray });
    res.status(201).json({ msg:"Withdrawal Approved" });

}
const confirmDeposit = async(req, res)=>{
    const [ userId, requestId ] = req.body;
    const depositsLog = await depositsLogModel.findById(userId);
    const financialSummary = await financialSummaryModel.findById(userId);
    const depositsArray = depositsLog.deposits;
    const availableFunds = financialSummary.availableFunds + depositsArray[requestId].amount;
    depositsArray[requestId]={...depositsArray[requestId], status:"successful"};
    await depositsLog.updateOne({ deposits:depositsArray });
    await financialSummary.updateOne({ availableFunds });
    res.status(201).json({ msg:"Deposit Approved" });

};

const buyProduct = async(req, res)=>{
    const { id } = req.user;
    const { price } = req.body;
    const financialSummary = await financialSummaryModel.findById(id);
    let availableFunds = financialSummary.availableFunds;
    let totalInvested = financialSummary.totalInvested;
    if(availableFunds<price) throw new BadRequest("Insufficient amount to purchase product");
    availableFunds -= price; totalInvested += price;
    await financialSummary.updateOne({ totalInvested, availableFunds });
    res.status(201).json({ msg:"Product Purchase Successful" })
}



module.exports = {
    confirmWithdrawal,
    deposit,
    reqWithwithdrawal,
    confirmDeposit,
    buyProduct
 }