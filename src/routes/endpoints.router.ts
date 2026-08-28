import express from 'express';
import { createEndpointController, getEndpointByIdController, getEndpointsController, updateEndpointController } from '../controllers/endpoints.controller';

const router = express.Router();

router.get('/:id', getEndpointByIdController);
router.patch('/:id', updateEndpointController);

router.post('/', createEndpointController);
router.get('/', getEndpointsController);

export default router;