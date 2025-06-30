import express from "express";
import bodyParser from "body-parser";
const app = express();
import config from "./config/server-config.js"
import connect from "./config/database-config.js"
import router from "./routes/index.js";
import cors from "cors";
import blogroutes from './routes/blog-routes.js'
import researchPaperRoutes from './routes/researchPaperRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
import multer from 'multer';

const allowedOrigins = [
  config.FRONTEND_URL,
  config.ADMIN_URL,
  config.RESEARCH_URL,
  config.FOUNDATION_URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use('/api', router);
app.use('/blog', blogroutes);
app.use('/researchPaper',researchPaperRoutes);
app.use('/faq',faqRoutes);

const storage = multer.memoryStorage();
export const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50 MB
});

const setupandstartserver = async () => {
    app.listen(config.PORT, async () => {
        console.log(`Server started at ${config.PORT}`);
        await connect();
        console.log("mongodb connected");
    })
}

setupandstartserver();