import { handlePrismaError } from "../helpers/prisma.helper";
import { EndpointCompleteResponse, EndpointDto, EndpointResponse } from "../interfaces/endpoint.interface";
import { createEndpointRepository, getEndpointByIdRepository, getEndpointsRepository } from "../repositories/endpoints.repository";
import { validateEndpointDto } from "../validators/endpoint.validator";
import { validateId } from "../validators/ids.validator";

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

export const getEndpointsService = async (): Promise<EndpointResponse[]> => {
    try {
        const endpoints: EndpointResponse[] = await getEndpointsRepository()

        return endpoints;
    } catch (error) {
        handlePrismaError(error, 'Endpoint');
        throw error;
    }
}

export const getEndpointByIdService = async (id: number): Promise<EndpointCompleteResponse> => {
    try {
        validateId(id)
        const endpoint: EndpointCompleteResponse = await getEndpointByIdRepository(id);

        return endpoint;
    } catch (error) {
        handlePrismaError(error, 'Endpoint');
        throw error;
    }
}
