const router = require("express").Router();

const {
    confirmWithdrawal,
    deposit,
    reqWithwithdrawal,
    confirmDeposit,
    buyProduct

}  = require("../controllers/transactions");

router.post("/deposit", deposit);
router.post("/withdraw", confirmWithdrawal);
router.post("/reqWithdrawal", reqWithwithdrawal);
router.post("/confirmDeposit", confirmDeposit);
router.post("/buyProduct", buyProduct);

module.exports = router;