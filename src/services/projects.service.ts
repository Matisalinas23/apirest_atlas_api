import { Project } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { ProjectDto } from "@/src/interfaces/projectDto.interface";
import { validateProjectDto } from "../validators/project.validator";
import { validateId } from "../validators/ids.validator";
import { handlePrismaError } from "../helpers/prisma.helper";

export const getProjectsService = async () => {
    try {
        const projects: Project[] = await prisma.project.findMany()

        return projects
    } catch (error) {
        throw error
    }
}

export const createProjectService = async (dtoProject: ProjectDto) => {
    try {
        const { name } = validateProjectDto(dtoProject);

        const project: Project = await prisma.project.create({
            data: { name }
        })

        return project
    } catch (error: any) {
        handlePrismaError(error)
        throw error
    }
}

export const updateProjectService = async (id: number, updateProjectDto: ProjectDto) => {
    try {
        const validId = validateId(id);
        const { name } = validateProjectDto(updateProjectDto);

        const project: Project = await prisma.project.update({
            where: { id: validId },
            data: { name }
        })

        return project
    } catch (error: any) {
        handlePrismaError(error)
        throw error
    }
}

export const deleteProjectService = async (id: number) => {
    try {
        const validId = validateId(id);

        const project: Project = await prisma.project.delete({
            where: { id: validId }
        })

        return project
    } catch (error: any) {
        handlePrismaError(error)
        throw error
    }
}

export const getProjectByIdService = async (id: number) => {
    try {
        const validId = validateId(id);

        const project: Project = await prisma.project.findUniqueOrThrow({
            where: { id: validId },
            include: {
                modules: {
                    include: {
                        modules: true,
                        endpoints: {
                            include: {
                                queryParameters: true,
                                pathParameters: true,
                                headers: true,
                            }
                        }
                    },
                }
            }
        })

        return project
    } catch (error: any) {
        handlePrismaError(error)
        throw error
    }
}
