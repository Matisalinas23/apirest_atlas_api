import { Module } from "@/generated/prisma/client"
import { BadRequestError } from "../errors/BadRequestError"
import { ModuleCompleteResponse, ModuleDto, ModuleResponse, UpdateModuleDto } from "../interfaces/module.interface"
import { prisma } from "../lib/prisma"
import { validateModuleDto, validateUpdateModuleDto } from "../validators/module.validator"
import { validateId } from "../validators/ids.validator"
import { handlePrismaError } from "../helpers/prisma.helper"
import { ProjectResponse } from "../interfaces/project.interface"
import { createModuleRepository, deleteModuleRepository, getModuleByIdRepository, getModulesRepository, updateModuleRepository } from "../repositories/modules.repository"

export const createModuleService = async (moduleDto: ModuleDto) => {
    try {
        const validModuleDto: ModuleDto = validateModuleDto(moduleDto)

        const existsProject: ProjectResponse | null = await prisma.project.findUnique({
            where: { id: validModuleDto.projectId }
        })

        if (!existsProject) {
            throw new BadRequestError("Project not found")
        }

        const module: ModuleResponse = await createModuleRepository(moduleDto)

        return module
    } catch (error) {
        handlePrismaError(error, "Module")
        throw error
    }
}

export const getModulesService = async () => {
    try {
        const modules: ModuleResponse[] = await getModulesRepository()

        return modules
    } catch (error) {
        throw error
    }
}

export const getModuleByIdService = async (id: number) => {
    try {
        const validId: number = validateId(id);

        const module: ModuleCompleteResponse = await getModuleByIdRepository(validId)

        return module
    } catch (error) {
        handlePrismaError(error, "Module")
        throw error
    }
}

export const updateModuleService = async (id: number, updateModuleDto: UpdateModuleDto) => {
    try {
        const validId: number = validateId(id);
        const validModuleDto: UpdateModuleDto = validateUpdateModuleDto(updateModuleDto);

        const module: ModuleResponse = await updateModuleRepository(validId, validModuleDto)

        return module
    } catch (error) {
        handlePrismaError(error, "Module")
        throw error
    }
}

export const deleteModuleService = async (id: number) => {
    try {
        const validId: number = validateId(id);

        const module: ModuleResponse = await deleteModuleRepository(validId)

        return module
    } catch (error) {
        handlePrismaError(error, "Module")
        throw error
    }
}