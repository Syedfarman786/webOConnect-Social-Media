const { Likes } = require("../models");


const postLikes = async (req, res) => {
    try {
        const { user_id } = req.login_token;
        const { post_id, post_like } = req.body;

        const likes = await Likes.create({
            post_id: post_id,
            user_id: user_id,
            post_like: post_like
        });
        return res.json({ message: "Post like successfully", likes });
    } catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
};
module.exports = postLikes;