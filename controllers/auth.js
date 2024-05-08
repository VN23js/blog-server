import User from "../models/User.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
//Register
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUsed = await User.findOne({ username });
    if (isUsed) {
      return res.json({ message: "Username занят" });
    }

    if (!password) {
      return res.json({ message: "Введите пароль" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash
    });
    const token = Jwt.sign(
      {
        id: newUser._id
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    await newUser.save();
    //delete newUser.password;
    return res.json({
      username: newUser.username,
      _id: newUser._id,
      token: token,
      message: "Пользователь успешно создан"
    });
  } catch (error) {
    res.json({ message: "Ошибка при создании пользователя" });
  }
};

//logins
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ message: "Пользователь не найден" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({ message: "Неверный пароль." });
    }
    const token = Jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({
      _id: user._id,
      username: user.username,
      posts: user.posts,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token: token,
      message: "Авторизация успешна"
    });
  } catch (error) {
    res.json({ message: "Ошибка при Авторизации" });
  }
};
// Get Me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({
        message: "Такого юзера не существует."
      });
    }

    const token = Jwt.sign(
      {
        _id: user._id
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      _id: user._id,
      username: user.username,
      posts: user.posts,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token: token
    });
  } catch (error) {
    res.json({ message: "Нет доступа." });
  }
};
//ADmin
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const admin = await Admin.findById(req.userId);

    if (!admin) {
      return res.status(401).json({ message: "User is not an admin" });
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
