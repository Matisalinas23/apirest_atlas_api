import { ModuleCompleteResponse, ModuleDto, ModuleResponse, UpdateModuleDto } from "../interfaces/module.interface"
import { prisma } from "../lib/prisma"

export const createModuleRepository = async (moduleDto: ModuleDto): Promise<ModuleResponse> => {
    const module: ModuleResponse = await prisma.module.create({
        data: {
            name: moduleDto.name,
            project: {
                connect: {
                    id: moduleDto.projectId
                }
            }
        }
    })

    return module
}

export const getModulesRepository = async (): Promise<ModuleResponse[]> => {
    const modules: ModuleResponse[] = await prisma.module.findMany()

    return modules
}

export const getModuleByIdRepository = async (id: number): Promise<ModuleCompleteResponse> => {
    const module: ModuleCompleteResponse = await prisma.module.findUniqueOrThrow({
        where: { id },
        include: {
            endpoints: true,
            modules: true
        }
    })

    return module
}

export const updateModuleRepository = async (id: number, updateModuleDto: UpdateModuleDto): Promise<ModuleResponse> => {
    const module: ModuleResponse = await prisma.module.update({
        where: { id },
        data: { name: updateModuleDto.name }
    })

    return module
}

export const deleteModuleRepository = async (id: number): Promise<ModuleResponse> => {
    const module: ModuleResponse = await prisma.module.delete({
        where: { id }
    })

    return module
}