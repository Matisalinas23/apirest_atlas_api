import express from 'express';
import { createEndpointController, getEndpointByIdController, getEndpointsController } from '../controllers/endpoints.controller';

const router = express.Router();

router.get('/:id', getEndpointByIdController);

router.post('/', createEndpointController);
router.get('/', getEndpointsController);

export default router;