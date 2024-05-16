import Post from "../models/Post.js";
import Comment from "../models/comment.js";
export const createComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    if (!comment) {
      return res
        .status(400)
        .json({ error: "Комментарий не может быть пустым" });
    }
    const newComment = new Comment({ comment });
    await newComment.save();
    try {
      await Post.findByIdAndUpdate(postId, {
        $push: {
          comments: newComment._id
        }
      });
    } catch (error) {
      res.json({ error: error });
    }

    res.json(newComment);
  } catch (error) {
    res.json({ error: error });
  }
};
