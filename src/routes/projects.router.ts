import express from 'express';
import { createProjectController, getProjectsController } from '@/controllers/projects.controller';

const router = express.Router();

router.get('/', getProjectsController);
router.post('/', createProjectController);

export default router;