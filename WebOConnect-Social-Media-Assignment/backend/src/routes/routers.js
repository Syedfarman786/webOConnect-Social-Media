const express = require("express");
const router = express.Router();
const { userAuthMiddleware } = require("../middleware/authMiddleware");
const signUp = require("../controllers/sign_up");
const login = require("../controllers/login");
const createPost = require("../controllers/userPosts");
const postLikes = require("../controllers/postLikes");
const userProfile = require("../controllers/userProfile");
const getPosts = require("../controllers/getPosts");
const userFollow = require("../controllers/userFollow");

router.post("/sign-up", signUp);
router.post("/login", login);
router.post("/user-post", userAuthMiddleware(), createPost);
router.post("/post-like", userAuthMiddleware(), postLikes);
router.post("/post-follow", userAuthMiddleware(), userFollow);
router.get("/user-profile", userAuthMiddleware(), userProfile);
router.get("/get-posts", userAuthMiddleware(), getPosts);

module.exports = { router };