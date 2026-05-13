const express = require("express");

const postsController = require("../controllers/postsController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", postsController.getPosts);
router.get("/:id", postsController.getPostById);
router.post("/", protect, postsController.createPost);
router.post("/:id/comments", protect, postsController.addComment);

module.exports = router;
