import { NextFunction, Request, Response } from "express";
import { EndpointDto, EndpointResponse } from "../interfaces/endpoint.interface";
import { createEndpointService } from "../services/endpoints.service";

export const createEndpointController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const endpointDto: EndpointDto = req.body;
        const endpoint: EndpointResponse = await createEndpointService(endpointDto);

        res.status(201).json({ endpoint })
    } catch (error) {
        next(error);
    }
}