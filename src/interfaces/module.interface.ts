import { EndpointResponse } from "./endpoint.interface"

export interface UpdateModuleDto {
    name: string
}

export interface ModuleDto extends UpdateModuleDto {
    projectId: number
}

export interface ModuleResponse {
    id: number
    name: string
    projectId: number
    moduleId: number | null
}

export interface ModuleCompleteResponse extends ModuleResponse {
    modules: ModuleResponse[]
    endpoints: EndpointResponse[]
}