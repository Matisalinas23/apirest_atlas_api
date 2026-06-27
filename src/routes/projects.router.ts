import express from 'express';
import { createProjectController, deleteProjectController, getProjectsController, updateProjectController } from '@/controllers/projects.controller';

const router = express.Router();

router.delete('/:id', deleteProjectController)
router.put('/:id', updateProjectController);

router.get('/', getProjectsController);
router.post('/', createProjectController);

export default router;