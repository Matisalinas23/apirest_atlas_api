import express from 'express'
import { createModuleController, getModulesController } from '../controllers/modules.controller';

const router = express.Router();

router.post("/", createModuleController);
router.get("/", getModulesController);

export default router;