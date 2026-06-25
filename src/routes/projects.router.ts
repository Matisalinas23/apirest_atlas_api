import express from 'express';
import { getProjectsController } from '../controllers/projects.controller';

const router = express.Router();

router.get('/', getProjectsController);

export default router;