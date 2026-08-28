import { EndpointCompleteResponse, EndpointDto, EndpointResponse } from "../interfaces/endpoint.interface"
import { prisma } from "../lib/prisma"

export const createEndpointRepository = async (endpointDto: EndpointDto): Promise<EndpointResponse> => {
    const endpoint: EndpointResponse = await prisma.endpoint.create({
        data: {
            name: endpointDto.name,
            path: endpointDto.path,
            method: endpointDto.method,
            description: endpointDto.description,
            notes: endpointDto.notes,
            requestBody: endpointDto.requestBody,
            tags: endpointDto.tags,
            module: {
                connect: {
                    id: endpointDto.moduleId
                }
            }
        }
    })

    return endpoint
}

export const getEndpointsRepository = async (): Promise<EndpointResponse[]> => {
    const endpoints: EndpointResponse[] = await prisma.endpoint.findMany();

    return endpoints
}

export const getEndpointByIdRepository = async (id: number): Promise<EndpointCompleteResponse> => {
    const endpoint: EndpointCompleteResponse = await prisma.endpoint.findUniqueOrThrow({
        where: { id },
        include: {
            pathParameters: true,
            queryParameters: true,
            headers: true,
            response: true,
        }
    })

    return endpoint
}