import express from 'express';
import { createProjectController, deleteProjectController, getProjectsController } from '@/controllers/projects.controller';

const router = express.Router();

router.delete('/:id', deleteProjectController)

router.get('/', getProjectsController);
router.post('/', createProjectController);

export default router;