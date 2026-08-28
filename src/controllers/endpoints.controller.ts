import { NextFunction, Request, Response } from "express";
import { EndpointCompleteResponse, EndpointDto, EndpointResponse } from "../interfaces/endpoint.interface";
import { createEndpointService, getEndpointByIdService, getEndpointsService } from "../services/endpoints.service";

export const createEndpointController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const endpointDto: EndpointDto = req.body;
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