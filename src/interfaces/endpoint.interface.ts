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
    method: string
    path: string

    moduleId: number
}

export interface EndpointCompleteResponse extends EndpointResponse {
    queryParameters: ParameterResponse[]
    pathParameters: ParameterResponse[]
    headers: HeaderResponse[]
    requestBody: string
    response: ResponseResponse
}