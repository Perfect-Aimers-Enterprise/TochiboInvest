const router = require("express").Router();
const { 
    dashBoard,
    referrals,
    withdrawalLog,
    allPendingWithdrawalLogs } = require("../controllers/details.js");

router.get("/dashboard", dashBoard);
router.get("/referrals", referrals);
router.get("/withdrawalLog", withdrawalLog);
router.get("/allPendingwithdrawalLogs", allPendingWithdrawalLogs);

module.exports = router;