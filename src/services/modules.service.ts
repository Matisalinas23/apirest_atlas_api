import { Module } from "@/generated/prisma/client"
import { BadRequestError } from "../errors/BadRequestError"
import { ModuleDto, UpdateModuleDto } from "../interfaces/moduleDto.interface"
import { prisma } from "../lib/prisma"
import { validateModuleDto, validateUpdateModuleDto } from "../validators/module.validator"
import { validateId } from "../validators/ids.validator"
import { handlePrismaError } from "../helpers/prisma.helper"

export const createModuleService = async (moduleDto: ModuleDto) => {
    try {
        const { name, projectId } = validateModuleDto(moduleDto)

        const existsProject = await prisma.project.findUnique({
            where: { id: projectId }
        })

        if (!existsProject) {
            throw new BadRequestError("Project not found")
        }

        const module = await prisma.module.create({
            data: {
                name: name,
                project: {
                    connect: {
                        id: projectId
                    }
                }
            }
        })

        return module
    } catch (error) {
        handlePrismaError(error, "Module")
        throw error
    }
}

export const getModulesService = async () => {
    try {
        const modules: Module[] = await prisma.module.findMany()

        return modules
    } catch (error) {
        throw error
    }
}

export const getModuleByIdService = async (id: number) => {
    try {
        const validId = validateId(id);

        const module = await prisma.module.findUniqueOrThrow({
            where: { id: validId },
            include: {
                endpoints: true,
                modules: true
            }
        })

        return module
    } catch (error) {
        handlePrismaError(error, "Module")
        throw error
    }
}

export const updateModuleService = async (id: number, updateModuleDto: UpdateModuleDto) => {
    try {
        const validId = validateId(id);
        const { name } = validateUpdateModuleDto(updateModuleDto);

        const module = await prisma.module.update({
            where: { id: validId },
            data: { name }
        })

        return module
    } catch (error) {
        handlePrismaError(error, "Module")
        throw error
    }
}