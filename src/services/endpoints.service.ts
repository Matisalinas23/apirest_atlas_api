import { handlePrismaError } from "../helpers/prisma.helper";
import { EndpointCompleteResponse, CreateEndpointDto, EndpointResponse, UpdateEndpointDto } from "../interfaces/endpoint.interface";
import { createEndpointRepository, getEndpointByIdRepository, getEndpointsRepository, updateEndpointRepository } from "../repositories/endpoints.repository";
import { validateEndpointDto, validateEndpointUpdateDto } from "../validators/endpoint.validator";
import { validateId } from "../validators/ids.validator";

export const createEndpointService = async (endpointDto: CreateEndpointDto): Promise<EndpointResponse> => {
    try {
        const validEndpointDto: CreateEndpointDto = validateEndpointDto(endpointDto);
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
        validateId(id);
        const endpoint: EndpointCompleteResponse = await getEndpointByIdRepository(id);

        return endpoint;
    } catch (error) {
        handlePrismaError(error, 'Endpoint');
        throw error;
    }
}

export const updateEndpointService = async (id: number, endpointDto: UpdateEndpointDto): Promise<EndpointResponse> => {
    try {
        const validId: number = validateId(id);
        const validEndpointDto: UpdateEndpointDto = validateEndpointUpdateDto(endpointDto);

        const endpoint: EndpointResponse = await updateEndpointRepository(validId, validEndpointDto);

        return endpoint;
    } catch (error) {
        handlePrismaError(error, 'Endpoint');
        throw error;
    }
}