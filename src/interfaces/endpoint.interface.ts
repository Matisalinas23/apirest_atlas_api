import { Prisma } from "@/generated/prisma/client"
import { HeaderResponse } from "./header.interface"
import { ParameterResponse } from "./parameter.interface"
import { ResponseResponse } from "./response.interace"

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD"

export interface EndpointDto {
    name: string
    description: string
    notes: string
    path: string
    requestBody: string
    moduleId: number
    tags: string[]

    method: HttpMethod
}

export interface EndpointResponse {
    id: number
    name: string
    description: string
    notes: string
    tags: string[]
    method: HttpMethod
    path: string
    requestBody: Prisma.JsonValue

    moduleId: number
}

export interface EndpointCompleteResponse extends EndpointResponse {
    queryParameters: ParameterResponse[]
    pathParameters: ParameterResponse[]
    headers: HeaderResponse[]
    response: ResponseResponse | null
}