import express from 'express';
import { createProjectController, deleteProjectController, getProjectByIdController, getProjectsController, updateProjectController } from '@/controllers/projects.controller';

const router = express.Router();

router.delete('/:id', deleteProjectController)
router.patch('/:id', updateProjectController);
router.get('/:id', getProjectByIdController);

router.get('/', getProjectsController);
router.post('/', createProjectController);

export default router;