const express = require("express");
const router = express.Router();

const { getUserByEmailAndPassword } = require("../controllers/user");

router.route("/login").post(getUserByEmailAndPassword);
module.exports = router;
