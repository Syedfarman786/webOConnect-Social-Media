const { User } = require("../models");


const userProfile = async (req, res) => {
    try {
        const { user_id } = req.login_token;

        const user = await User.findOne({
            where: {
                id: user_id
            },
            attributes: ["id", "first_name", "last_name"]
        });
        return res.json({ message: "User profile retrieved successfully", user });
    } catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
};
module.exports = userProfile;