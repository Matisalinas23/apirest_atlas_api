import { prisma } from "@/lib/prisma";
import { validateProjectDto } from "../validators/project.validator";
import { validateId } from "../validators/ids.validator";
import { handlePrismaError } from "../helpers/prisma.helper";

import {
    createProjectRepository,
    deleteProjectRepository,
    getProjectByIdRepository,
    updateProjectRepository
} from "@/src/repositories/projects.repository";
import {
    ProjectCompleteResponse,
    ProjectDto,
    ProjectResponse
} from "@/src/interfaces/project.interface";

export const createProjectService = async (dtoProject: ProjectDto) => {
    try {
        const validProjectDto: ProjectDto = validateProjectDto(dtoProject);

        const project: ProjectResponse = await createProjectRepository(validProjectDto)

        return project
    } catch (error: any) {
        handlePrismaError(error, "Project")
        throw error
    }
}

export const getProjectsService = async () => {
    try {
        const projects: ProjectResponse[] = await prisma.project.findMany()

        return projects
    } catch (error) {
        throw error
    }
}

export const getProjectByIdService = async (id: number) => {
    try {
        const validId: number = validateId(id);

        const project: ProjectCompleteResponse = await getProjectByIdRepository(validId)

        return project
    } catch (error: any) {
        handlePrismaError(error, "Project")
        throw error
    }
}

export const updateProjectService = async (id: number, updateProjectDto: ProjectDto) => {
    try {
        const validId: number = validateId(id);
        const validProjectDto: ProjectDto = validateProjectDto(updateProjectDto);

        const project: ProjectResponse = await updateProjectRepository(validId, validProjectDto)

        return project
    } catch (error: any) {
        handlePrismaError(error, "Project")
        throw error
    }
}

export const deleteProjectService = async (id: number) => {
    try {
        const validId: number = validateId(id);

        const project: ProjectResponse = await deleteProjectRepository(validId)

        return project
    } catch (error: any) {
        handlePrismaError(error, "Project")
        throw error
    }
}
