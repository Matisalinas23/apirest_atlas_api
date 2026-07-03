import { handlePrismaError } from "../helpers/prisma.helper";
import { EndpointDto, EndpointResponse } from "../interfaces/endpoint.interface";
import { createEndpointRepository } from "../repositories/endpoints.repository";
import { validateEndpointDto } from "../validators/endpoint.validator";

export const createEndpointService = async (endpointDto: EndpointDto): Promise<EndpointResponse> => {
    try {
        const validEndpointDto: EndpointDto = validateEndpointDto(endpointDto);
        const endpoint: EndpointResponse = await createEndpointRepository(validEndpointDto);

        return endpoint;
    } catch (error) {
        handlePrismaError(error, 'Endpoint');
        throw error;
    }
}