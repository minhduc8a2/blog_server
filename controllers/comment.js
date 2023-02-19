const Comment = require("../models/Comment");
const mongoose = require("mongoose");
const CustomErrors = require("../errors/customErrors");
const getAllComments = async (req, res) => {
  const allComments = await Comment.find({});
  res.status(200).json({ msg: true, data: allComments });
};

const getComment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomErrors("Id is not a valid");
  }
  const comment = await Comment.findById(id);
  res.status(200).json({ msg: true, data: comment });
};

const getSomeComments = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomErrors("Id is not a valid");
  }
  const comment = await Comment.find({ post_id: id });
  res.status(200).json({ msg: true, data: comment });
};
const createComment = async (req, res) => {
  const { post_id, content, name, email, avatar } = req.body;

  if (!content || !name || !email || !avatar || !post_id) {
    throw new CustomErrors("Lack of information of some fields");
  }

  const newComment = await Comment.create({
    content,
    name,
    email,
    avatar,
    post_id,
  });
  res.status(201).json({ msg: true, data: newComment });
};
const updateComment = async (req, res) => {
  //find the post with id
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomErrors("Id is not a valid");
  }
  const comment = await Comment.findById(id);
  //
  const { content } = req.body;

  if (content) comment.content = content;

  await Comment.save();
  res.status(200).json({ msg: true, data: comment });
};
const deleteComment = async (req, res) => {
  //find the post with id
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomErrors("Id is not a valid");
  }
  const comment = await Comment.deleteOne({ _id: id });

  res.status(200).json({ msg: true, data: comment });
};

module.exports = {
  getAllComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
  getSomeComments,
};
