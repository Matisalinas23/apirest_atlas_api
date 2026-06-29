import express from 'express'
import { createModuleController } from '../controllers/modules.controller';

const router = express.Router();

router.post("/", createModuleController);

export default router;