import express from "express";
import bodyParser from "body-parser";
const app = express();
import config from "./config/server-config.js"
import connect from "./config/database-config.js"
import router from "./routes/index.js";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api', router);
const setupandstartserver = async () => {
    app.listen(config.PORT, async () => {
        console.log(`Server started at ${config.PORT}`);
        await connect();
        console.log("mongodb connected");
    })
}

setupandstartserver();