import { StringifyOptions } from "node:querystring"
import { HeaderResponse } from "./header.interface"
import { ParameterResponse } from "./parameter.interface"
import { ResponseResponse } from "./response.interace"

export interface EndpointResponse {
    id: number
    name: string
    description: string
    notes: string
    tags: string[]
    method: string
    url: string

    moduleId: number
}

export interface EndpointCompleteResponse extends EndpointResponse {
    queryParameters: ParameterResponse[]
    pathParameters: ParameterResponse[]
    headers: HeaderResponse[]
    requestBody: string
    response: ResponseResponse
}