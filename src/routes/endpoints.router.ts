import express from 'express';
import { createEndpointController, getEndpointsController } from '../controllers/endpoints.controller';

const router = express.Router();

router.post('/', createEndpointController);
router.get('/', getEndpointsController);

export default router;