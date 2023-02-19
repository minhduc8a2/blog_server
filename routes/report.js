const express = require("express");
const router = express.Router();
const {
  getReport,updateReport,createReport
} = require("../controllers/report");

router.route("/").get(getReport);

router.route("/update").put(updateReport);
router.route("/create").post(createReport);

module.exports = router;
