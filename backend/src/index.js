import express from "express";
import bodyParser from "body-parser";
const app = express();
import config from "./config/server-config.js"
import connect from "./config/database-config.js"
import router from "./routes/index.js";
import cors from "cors";
import blogroutes from './routes/blog-routes.js'
import researchPaperRoutes from './routes/researchPaperRoutes.js';

app.use(cors({
  origin:config.FRONTEND_URL, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// ✅ Then body parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Then JSON parser and routes
app.use(express.json());
app.use('/api', router);
app.use('/blog', blogroutes);
app.use('/researchPaper',researchPaperRoutes);


const setupandstartserver = async () => {
    app.listen(config.PORT, async () => {
        console.log(`Server started at ${config.PORT}`);
        await connect();
        console.log("mongodb connected");
    })
}

setupandstartserver();