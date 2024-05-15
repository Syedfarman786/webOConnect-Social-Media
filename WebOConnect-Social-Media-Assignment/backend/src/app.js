const express = require("express");
const os = require("os");
// const { postTrimmer } = require("./helpers/validations");
// const useragent = require("express-useragent");
const fileUpload = require("express-fileupload");
const cors = require("cors");
// const bodyParser = require('body-parser')
const app = express();
// app.use(cors({
//     origin: [
//         "*"
//     ]
// }));
app.use(cors());

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: os.tmpdir(),
    preserveExtension: true,
    parseNested: true
}));

app.use((req, res, next) => {
    req.body = {
        ...req.body,
        ...req.files
    };

    next();
});

app.use(express.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(useragent.express());
// app.use(postTrimmer);

app.use(express.static("assets"));
// app.set("views", "./src/views");
// app.set("view engine", "ejs");

module.exports = { app };
