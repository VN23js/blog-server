import Post from "../models/Post.js";
import User from "../models/User.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
//Create posts

export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const user = await User.findById(req.userId);
    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, "..", "uploads", fileName));
      const newPostWithImage = new Post({
        username: user.username,
        title,
        text,
        imgUrl: fileName,
        author: req.userId
      });
      await newPostWithImage.save();
      await User.findByIdAndUpdate(req.userId, {
        $push: {
          posts: newPostWithImage
        }
      });
      return res.json({ newPostWithImage, message: "Пост успешно создан" });
    }

    const newPostWithoutImage = new Post({
      username: user.username,
      title,
      text,
      imaUrl: "",
      author: req.userId
    });
    await newPostWithoutImage.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: {
        posts: newPostWithoutImage
      }
    });

    res.json({ newPostWithoutImage, message: "Пост успешно создан" });
  } catch (error) {
    res.json({ message: "Ошибка" });
  }
};
////////////////////////////////////////////////////////////////
//GET ALL /posts

export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort("-createdAt");
    const popularPosts = await Post.find().limit(5).sort("-views");

    if (!posts) {
      return res.json({ message: "Постов нет" });
    }

    res.json({ posts, popularPosts });
  } catch (error) {
    res.json([{ error: error.message }]);
  }
};

export const getById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 }
    });

    if (!post) {
      res.status(404).json({ message: "Post not found" });
    } else {
      res.json(post);
    }
  } catch (error) {
    res.status(500).json({ message: "Что-то не так!" });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const list = await Promise.all(
      user.posts.map((post) => {
        return Post.findById(post._id);
      })
    );

    res.json(list);
  } catch (error) {
    res.status(500).json({ message: "Что-то не так!" });
  }
};

export const removePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post)
      return res.status(404).json({ message: "Такого поста не существует" });
    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id }
    });
    res.json({ message: "Пост успешно удален" });
  } catch (error) {
    res.json({ message: "Что-то не так!" });
  }
};
