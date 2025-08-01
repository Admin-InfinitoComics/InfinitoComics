import express from "express";
import bodyParser from "body-parser";
const app = express();
import config from "./config/server-config.js"
import connect from "./config/database-config.js"
import userroutes from "./routes/user-routes.js";
import cors from "cors";
import blogroutes from './routes/blog-routes.js'
import researchPaperRoutes from './routes/researchPaperRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
import multer from 'multer';
import adminroutes from './routes/admin-routes.js';
import timelineRoutes from './routes/timelineRoutes.js';
import CareerRoutes from './routes/career-routes.js';
import supportRoutes from './routes/support-routes.js';
import comicRoutes from './routes/comic-routes.js';
import characterRoutes from './routes/character-routes.js';
import aboutTimelineRoutes from './routes/aboutTimelineRoutes.js';
import paymentroutes from "./routes/payment-routes.js";

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
app.use('/api', userroutes);
app.use('/blog', blogroutes);
app.use('/researchPaper',researchPaperRoutes);
app.use('/faq',faqRoutes);
app.use('/admin', adminroutes);
app.use('/timeline', timelineRoutes);
app.use('/timeline/aboutUs', aboutTimelineRoutes);
app.use('/career', CareerRoutes);
app.use('/support', supportRoutes);
app.use('/api/comic', comicRoutes);
app.use('/character', characterRoutes);
app.use('/payment', paymentroutes);
app.get('/', (req, res) => {
  res.send('🚀 Backend is up and running!');
});

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
