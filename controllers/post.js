const Post = require("../models/Post");
const mongoose = require("mongoose");
const CustomErrors = require("../errors/customErrors");
const getAllPosts = async (req, res) => {
  const allPosts = await Post.find({});
  res.status(200).json({ msg: true, data: allPosts });
};


const getLatestPosts = async (req, res) => {
  let skip = (await Post.count({})) - 3;
  const allPosts = await Post.find({}).skip(skip);
  res.status(200).json({ msg: true, data: allPosts });
};
const getPost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomErrors("Id is not a valid");
  }
  const post = await Post.findById(id);
  res.status(200).json({ msg: true, data: post });
};
const createPost = async (req, res) => {
  const { title, content, author, tag, image } = req.body;
  //   res.status(200).json(req.body);

  if (!title || !content || !author || !tag) {
    throw new CustomErrors("Lack of information of some fields");
  }

  const newPost = await Post.create({ title, content, author, tag, image });
  res.status(201).json({ msg: true, data: newPost });
};
const updatePost = async (req, res) => {
  //find the post with id
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomErrors("Id is not a valid");
  }
  const post = await Post.findById(id);
  //
  const { title, content, author, tag, image } = req.body;
  if (title) post.title = title;
  if (content) post.content = content;
  if (author) post.author = author;
  if (tag) post.tag = tag;
  if (image) post.image = image;
  await post.save();
  res.status(200).json({ msg: true, data: post });
};
const deletePost = async (req, res) => {
  //find the post with id
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new CustomErrors("Id is not a valid");
  }
  const post = await Post.deleteOne({ _id: id });

  res.status(200).json({ msg: true, data: post });
};

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getLatestPosts,
};
