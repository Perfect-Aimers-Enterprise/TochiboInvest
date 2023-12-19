const router = require("express").Router();
const { 
    dashBoard,
    referrals,
    withdrawalLog } = require("../controllers/details.js");

router.get("/dashboard", dashBoard);
router.get("/referrals", referrals);
router.get("/withdrawalLog", withdrawalLog);

module.exports = router;