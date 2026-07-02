import { ModuleResponse } from "./module.interface";

export interface ProjectDto {
    name: string;
}

export interface ProjectResponse {
    id: number
    name: string
    lastModifyDate: Date
}

export interface ProjectCompleteResponse extends ProjectResponse {
    modules: ModuleResponse[]
}