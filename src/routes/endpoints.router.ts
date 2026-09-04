import express from 'express';
import { createEndpointController, deleteEndpointController, getEndpointByIdController, getEndpointsController, updateEndpointController } from '../controllers/endpoints.controller';

const router = express.Router();

router.get('/:id', getEndpointByIdController);
router.patch('/:id', updateEndpointController);
router.delete('/:id', deleteEndpointController);

router.post('/', createEndpointController);
router.get('/', getEndpointsController);

export default router;