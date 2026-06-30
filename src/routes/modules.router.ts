import express from 'express'
import { createModuleController, getModuleByIdController, getModulesController } from '../controllers/modules.controller';

const router = express.Router();

router.get('/:id', getModuleByIdController);

router.post("/", createModuleController);
router.get("/", getModulesController);

export default router;