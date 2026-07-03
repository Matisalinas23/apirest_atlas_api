import { EndpointDto, EndpointResponse } from "../interfaces/endpoint.interface"
import { prisma } from "../lib/prisma"

export const createEndpointRepository = async (endpointDto: EndpointDto): Promise<EndpointResponse> => {
    const endpoint: EndpointResponse = await prisma.endpoint.create({
        data:{
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