const { Follows } = require("../models");


const userFollow = async (req, res) => {
    try {
        const { user_id } = req.login_token;
        const { post_id } = req.body;


        const follow = await Follows.create({
            follower_id: post_id,
            user_id: user_id,
        });
        return res.json({ message: "User follow successfully", follow });
    } catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
};
module.exports = userFollow