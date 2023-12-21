const userModel = require("../models/User.js");
const referralsModel = require("../models/referrals.js");
const fSModel = require("../models/financialSummary.js");
const depositsModel = require("../models/deposit.js");
const withdrawalModel = require("../models/withdrawal.js")

const dashBoard = async(req, res)=>{
    console.log("hey")
    const { userID } = req.user;
    let fs = await fSModel.findById(userID);
    fs = { PurchaseCount:fs.PurchaseCount, availableFunds:fs.availableFunds, totalInvested:fs.totalInvested };
    let user = await userModel.findById(userID);
    user = { email:user.email, name:user.name, referralCode:user.referralCode };
    let referrals = await referralsModel.findById(userID);
    const details = {
        fs,
        user
    };
    if(referrals.referrals.length!==0){
        recentReferrals = [referrals.referrals[referrals.referrals.length-1], referrals.referrals[referrals.referrals.length-2]];
        details.recentReferrals = recentReferrals;
    }

    res.status(200).json(details);
}

const referrals = async (req, res)=>{
    const { userID } = req.user;
    const referrals = await referralsModel.findById(userID);
    const user = await userModel.findById(userID);
    const details = { referralCode:user.referralCode, referralsCount:user.referralCount, referrals:referrals.referrals };
    console.log(details);
    res.status(200).send(details);

}

const withdrawalLog = async(req, res)=>{
    const { userID } = req.user;
    const withdrawalLog = await withdrawalModel.findById(userID);
    const withdrawals = withdrawalLog.withdrawals;
    res.status(200).json(withdrawals);
    console.log("log");
}

module.exports = {
    dashBoard,
    referrals,
    withdrawalLog
}