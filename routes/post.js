const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getLatestPosts,
} = require("../controllers/post");

router.route("/").get(getAllPosts).post(createPost);
router.route("/latest").get(getLatestPosts);
router.route("/:id").get(getPost).put(updatePost).delete(deletePost);

module.exports = router;
