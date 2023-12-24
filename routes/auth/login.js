const Express = require("express");
const router = Express.Router();
const { login } = require ("../../controllers/auth/login.js");
router.post("/", login);
module.exports = router;
