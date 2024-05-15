require("dotenv").config();
const { app } = require("./app");
const PORT = 8080;
const HOST = "localhost";
const requireDir = require("require-dir");
const { router } = require("./routes/routers");
requireDir("./controllers", { recurse: true });

app.use(router);

app.listen(Number(PORT), HOST, async () => {
    console.log(`listening on ${HOST}:${PORT}`);
});