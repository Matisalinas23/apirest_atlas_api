import { NextFunction, Request, Response } from "express";
import { EndpointCompleteResponse, CreateEndpointDto, EndpointResponse, UpdateEndpointDto } from "../interfaces/endpoint.interface";
import { createEndpointService, deleteEndpointService, getEndpointByIdService, getEndpointsService, updateEndpointService } from "../services/endpoints.service";

export const createEndpointController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const endpointDto: CreateEndpointDto = req.body;
        const endpoint: EndpointResponse = await createEndpointService(endpointDto);

        res.status(201).json({ endpoint })
    } catch (error) {
        next(error);
    }
}

export const getEndpointsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const endpoints: EndpointResponse[] = await getEndpointsService();

        res.status(200).json({ endpoints });
    } catch (error) {
        next(error);
    }
}

export const getEndpointByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const endpointId: number = Number(req.params.id);
        const endpoint: EndpointCompleteResponse = await getEndpointByIdService(endpointId);

        res.status(200).json({ endpoint });
    } catch (error) {
        next(error);
    }
}

export const updateEndpointController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const endpointId: number = Number(req.params.id);
        const endpointDto: UpdateEndpointDto = req.body;
        const updatedEndpoint: EndpointResponse = await updateEndpointService(endpointId, endpointDto);

        res.status(200).json({ updatedEndpoint });
    } catch (error) {
        next(error);
    }
}

export const deleteEndpointController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const endpointId: number = Number(req.params.id);
        await deleteEndpointService(endpointId);

        res.status(200).json({ message: "Endpoint deleted successfully" });
    } catch (error) {
        next(error);
    }
}