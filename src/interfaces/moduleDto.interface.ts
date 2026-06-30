export interface UpdateModuleDto {
    name: string
}

export interface ModuleDto extends UpdateModuleDto {
    projectId: number
}