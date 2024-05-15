const { UserPosts, Likes } = require("../models");


const getPosts = async (req, res) => {

    const posts = await UserPosts.findAll();
    return res.json({ message: "User posts retrieved succesfully", posts });
};
module.exports = getPosts;