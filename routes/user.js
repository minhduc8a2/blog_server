const express = require("express");
const router = express.Router();

const { getUserByEmailAndPassword,login,getUsers,signUp } = require("../controllers/user");

router.route("/login/admin").post(getUserByEmailAndPassword);
router.route("/login").post(login);
router.route("/signup").post(signUp);
router.route("/").get(getUsers);
module.exports = router;
