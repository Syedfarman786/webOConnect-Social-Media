const { User } = require("../models");
const bcrypt = require("bcrypt");


const signUp = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, password } = req.body;

        const isPhoneExist = await User.findOne({
            where: {
                phone: phone
            }
        });

        if (isPhoneExist) return res.json({ message: "Mobile number is already exits" });

        if (!(phone?.length == 10 && phone > 6000000000 && phone < 9999999999)) {
            return res.json({ message: "Please enter correct mobile number" });
        };

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            phone: phone,
            password: hashPassword
        });

        return res.json({ message: "User created successfully", user, type: "success" });
    } catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
};
module.exports = signUp;
