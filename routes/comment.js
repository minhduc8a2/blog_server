const express = require("express");
const router = express.Router();
const {
  getAllComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
  getSomeComments,
} = require("../controllers/comment");

router.route("/").get(getAllComments).post(createComment);
router.route("/:id").get(getComment).put(updateComment).delete(deleteComment);
router.route("/some/:id").get(getSomeComments);

module.exports = router;
