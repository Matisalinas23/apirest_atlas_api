import { Module, Prisma } from "@/generated/prisma/client"
import { BadRequestError } from "../errors/BadRequestError"
import { ModuleDto } from "../interfaces/moduleDto.interface"
import { prisma } from "../lib/prisma"
import { validateModuleDto } from "../validators/module.validator"
import { validateId } from "../validators/ids.validator"
import { NotFoundError } from "../errors/NotFoundError"

const KnownRequestError = Prisma.PrismaClientKnownRequestError

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
    } catch (error: any) {
        if (error instanceof KnownRequestError && error.code === 'P2025') {
            throw new NotFoundError("A module with this id doesn't exist")
        }

        throw error
    }
}