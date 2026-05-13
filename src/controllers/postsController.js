const mongoose = require("mongoose");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Post.findById(req.params.id)
      .populate("author", "username email")
      .populate({
        path: "comments",
        populate: { path: "author", select: "username email" },
      });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const post = await Post.create({
      title,
      content,
      author: req.user._id,
    });

    const populatedPost = await post.populate("author", "username email");

    res.status(201).json(populatedPost);
  } catch (error) {
    next(error);
  }
};

const addComment = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({
      content,
      author: req.user._id,
      post: post._id,
    });

    post.comments.push(comment._id);
    await post.save();

    const populatedComment = await comment.populate("author", "username email");

    res.status(201).json(populatedComment);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  addComment,
};
