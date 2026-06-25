import express from 'express';
import cors from 'cors';
import projectsRouter from './routes/projects.router'
import { errorHandler } from './middlewares/errorHandler';

const app = express();

const LOCAL_FRONTEND_URL = process.env.LOCAL_FRONTEND_URL || 'http://localhost:5173';

app.use(express.json());
app.use(cors({
    origin: LOCAL_FRONTEND_URL,
}));

app.use("/projects", projectsRouter);

app.use(errorHandler);

export default app;