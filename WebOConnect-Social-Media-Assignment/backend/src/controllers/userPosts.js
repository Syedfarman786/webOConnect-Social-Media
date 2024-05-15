const { UserPosts } = require("../models");
const path = require("path");

const createPost = async (req, res) => {
    try {
        const { user_id } = req.login_token;
        const { name, media_url } = req.body;

        console.log(user_id,"-------------user_id");
        
        const uploadImage = (image, filepath) => {
            const fileName = image.md5 + +new Date + 1;
            const extension = path.extname(image.name);
            image.mv(`assets/${filepath}/` + fileName + extension);
            return fileName + extension;
        }
        const file = uploadImage(media_url, "images/post");


        const post = await UserPosts.create({
            user_id: user_id,
            content: name,
            media_url: file
        });

        return res.json({ message: "Post created successfully", post });

    } catch (error) {
        return res.json({ message: "Server error", error: error.message });
    }
};
module.exports = createPost;