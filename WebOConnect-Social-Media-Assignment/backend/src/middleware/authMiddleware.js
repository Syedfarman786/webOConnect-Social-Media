const { Tokens, User } = require("../models");
const jwt = require("jsonwebtoken");

const userAuthMiddleware = () => async (req, res, next) => {

    let token_id = req.headers.authorization || req.query.token_id || "";
    token_id = token_id.replace("Bearer ", "");
    const errorMessage = "Invalid Token or Token Expired";

    if (!token_id)
        return res.json({errorMessage});

    const token = await Tokens.findOne({
        where: {
            token: token_id
        },
        include: [{
            model: User,
            as: "user"
        }]
    });

    if (!token || !token.user)
        return res.json({errorMessage});

    req.login_token = token;
    next();
};

module.exports = {
    userAuthMiddleware
};