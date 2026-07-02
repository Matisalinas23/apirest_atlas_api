import express from 'express'
import { createModuleController, deleteModuleController, getModuleByIdController, getModulesController, updateModuleController } from '../controllers/modules.controller';

const router = express.Router();

router.get('/:id', getModuleByIdController);
router.patch('/:id', updateModuleController);
router.delete('/:id', deleteModuleController);

router.post("/", createModuleController);
router.get("/", getModulesController);

export default router;