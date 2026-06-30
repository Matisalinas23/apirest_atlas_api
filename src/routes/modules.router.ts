import express from 'express'
import { createModuleController, getModuleByIdController, getModulesController, updateModuleController } from '../controllers/modules.controller';

const router = express.Router();

router.get('/:id', getModuleByIdController);
router.patch('/:id', updateModuleController);

router.post("/", createModuleController);
router.get("/", getModulesController);

export default router;