const Comment = require("../models/Comment");

const Post = require("../models/Post");

const getComments = async (req, res) => {
  const comments = await Comment.find({
    post: req.params.postId
  }).populate("author", "username");

  res.json(comments);
};

const createComment = async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    return res.status(404).json({
      error: "Post not found"
    });
  }

  const comment = await Comment.create({
    content: req.body.content,
    author: req.user._id,
    post: req.params.postId
  });

  res.status(201).json(comment);
};

module.exports = {
  getComments,
  createComment
};