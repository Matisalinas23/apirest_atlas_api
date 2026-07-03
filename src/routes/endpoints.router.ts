import express from 'express';
import { createEndpointController } from '../controllers/endpoints.controller';

const router = express.Router();

router.post('/', createEndpointController);

export default router;