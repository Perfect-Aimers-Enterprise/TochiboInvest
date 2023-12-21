const userModel = require("../../models/User.js");
const FSModel = require("../../models/financialSummary.js");
const User = require("../../models/User.js");
const withdrawalModel = require("../../models/withdrawal.js")
const depositModel = require("../../models/deposit.js")
const referralsModel = require("../../models/referrals.js");
const Transporter  = require("../../library.js");
const otpModel = require("../../models/OTP.js");
const bcrypt = require("bcryptjs");
const otpGenerator = require("otp-generator");
const statusCodes = require("http-status-codes");
const { BadRequest } = require("../../errors/index.js");
const financialSummary = require("../../models/financialSummary.js");
const { authenticationError } = require("../../errors")


const preRegister = async (req, res) => {
    const { invitersRCode } = req.body;
    if(invitersRCode){
        let invitersIds;
        let inviter0 = await userModel.findOne({ referralCode:invitersRCode });
        if(inviter0){

            const inviter0Id = inviter0._id;
    
            invitersIds = [ inviter0Id ];

            if(inviter0.invitersIds.length!==0){
                let inviter1Id = inviter0.invitersIds[0];
                invitersIds.push(inviter1Id);
            }
            req.body = { ...req.body, invitersIds  };
        }
    }
    const user =  await User.create( req.body );
    await sendOtp(req, res, user);
};

 // timahenoch@gmail.com
const sendOtp = async(req, res, user)=>{
    const otp = otpGenerator.generate(5, { lowerCaseAlphabets:false, upperCaseAlphabets:false, specialChars: false });
    console.log(otp);
    const otpDoc = await otpModel.create({ otp, _id: user._id, expiresAt: Date.now() + 5 * 60 *1000 });

    const mailOptions = {
        from: "Tochibo '<melodyozuru087@gmail.com>'",
        to: `${user.email}`,
        subject: "Your OTP",
        html: `<h2> Hello ${user.name}.</h2>
               <br> Your OTP is ${otp} 
                `
    };
    // console.log(Date.now(), otpDoc.expiresAt);
    const info = await Transporter.sendMail(mailOptions);
    console.log("now");
    res.status(201).send({ msg:"OTP sent successfully", id: user._id});
}

const resendOTP = async(req, res)=>{
    const { id  } = req.params;
    await otpModel.deleteMany({_id:id });
    const user = await userModel.findById({_id:id });
    await sendOtp(req, res, user);
}

const register = async(req, res)=>{
    const { id, enteredOTP } = req.body;
    const user = await userModel.findOne({_id:id});
    if(user.status==="verified") throw new BadRequest("You are already a verified user");
    
    const otp = await otpModel.findOne({ _id:id });
    // console.log(Date.now(), otp.expiresAt);
    console.log(otp.expiresAt);
    const isExpired = Date.now() > otp.expiresAt;

    if(isExpired) throw new BadRequest("The OTP has expired");
    const isCorrect = await bcrypt.compare(enteredOTP, otp.otp);
    
    if(!isCorrect) throw new authenticationError("Wrong OTP");
    await assignReferralInfo(user);
    await financialSummary.create({ _id: user._id, availableFunds: 400});
    await withdrawalModel.create({ _id: user._id});
    await depositModel.create({ _id: user._id});
    await rewardInviters(user);
    await userModel.updateOne({ _id:id }, { status:"verified" });
    await otpModel.deleteMany({ _id:id });
    const token = await user.createJWT();
    res.status(statusCodes.CREATED).send({ token });
}


const rewardInviters = async (user)=>{
    const invitersIds = user.invitersIds;
    if(!invitersIds) return null;
    for(let i=0; i<invitersIds.length; i++){
        let inviter = await userModel.findOne({ _id:invitersIds[i] });
        inviter.referralCount++;
        await userModel.updateOne({ _id:invitersIds[i] }, {referralCount:inviter.referralCount });
        if (i==0){
            const financialSummaryOfInviter0 = await financialSummary.findById(invitersIds[i]);
            financialSummaryOfInviter0.availableFunds += 50;
            await financialSummary.updateOne({_id:invitersIds[i]}, { availableFunds: financialSummaryOfInviter0.availableFunds});
            await appendReferrals("A", invitersIds[i], user);

        }
        else {await appendReferrals("B", invitersIds[i], user);}
    }
}

const assignReferralInfo = async (user)=>{
    let unique = null;
    let referralCode = null;
    while(!unique){
        referralCode = otpGenerator.generate(6, { lowerCaseAlphabets:true, upperCaseAlphabets:true, specialChars: false });
        unique = !await userModel.findOne({ referralCode });
        console.log(unique);
    }
    user.referralCode = referralCode;

    await userModel.updateOne({ _id:user._id }, { referralCode:user.referralCode });

    const referrals = await referralsModel.create({ _id: user._id });
}

const appendReferrals= async(Team, invitersId, user)=>{
            const { email, totalInvested } = user;
            const newReferredInfo = { email, totalInvested:0, Team:Team };
            const referrals = await referralsModel.findOne({ _id:invitersId });
            let referralsArray = referrals.referrals;
            referralsArray.push(newReferredInfo);
            await referralsModel.findOneAndUpdate({_id:invitersId}, { referrals:referralsArray });

            referrals.referralCount = referralsArray.length;
            await referrals.updateOne( {referralsCount:referrals.referralCount });
}

const testingStuff = (req, res)=>{
res.send({msg:"Available"}).status(200)
}

module.exports = {
    preRegister,
    sendOtp,
    resendOTP,
    register,
    testingStuff
}