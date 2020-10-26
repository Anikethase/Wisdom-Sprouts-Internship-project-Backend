var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { signUp,signIn, getsignUp } = require("../controllers/auth");

//
router.post("/signUp",[
    check("full_name", "Name should be at least 2 characters").isLength({ min: 2 }),
    check("email", "Email is Required").isEmail(),
    check("password", "Password should contains at least 6 characters").isLength({ min: 6 })],signUp);

router.get("/signUp",getsignUp);

router.post("/signIn",[
    check("email", "Email is Required").isEmail(),
    check("password", "Password is Required").isLength({ min: 6 })],signIn);


    module.exports = router;