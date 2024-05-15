const { Tokens, User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const login = async (req, res) => {
    try {
        const { phone, password } = req.body;

        const isUserExist = await User.findOne({
            where: {
                phone: phone
            }
        });

        if (!isUserExist) {
            return res.json({ message: "User doesn't exist" })
        };

        const matchPassword = await bcrypt.compare(password, isUserExist.password);

        if (!matchPassword) {
            return res.json({ message: "Password is incorrect" });
        };

        const createToken = jwt.sign({ id: isUserExist.id, phone: isUserExist.phone }, process.env.SECRET_KEY);

        const token = await Tokens.create({
            user_id: isUserExist.id,
            token: createToken
        });

        return res.json({ message: "User login successfully", token, type: "success" });
    } catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
};

module.exports = login;