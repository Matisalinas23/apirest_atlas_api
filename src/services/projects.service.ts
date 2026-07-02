import { Project } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { ProjectDto } from "@/src/interfaces/project.interface";
import { validateProjectDto } from "../validators/project.validator";
import { validateId } from "../validators/ids.validator";
import { handlePrismaError } from "../helpers/prisma.helper";
import { createProjectRepository, deleteProjectRepository, getProjectByIdRepository, updateProjectRepository } from "../repositories/projects.repository";

export const createProjectService = async (dtoProject: ProjectDto) => {
    try {
        const validProjectDto = validateProjectDto(dtoProject);

        const project: Project = await createProjectRepository(validProjectDto)

        return project
    } catch (error: any) {
        handlePrismaError(error, "Project")
        throw error
    }
}

export const getProjectsService = async () => {
    try {
        const projects: Project[] = await prisma.project.findMany()

        return projects
    } catch (error) {
        throw error
    }
}

export const getProjectByIdService = async (id: number) => {
    try {
        const validId = validateId(id);

        const project: Project = await getProjectByIdRepository(validId)

        return project
    } catch (error: any) {
        handlePrismaError(error, "Project")
        throw error
    }
}

export const updateProjectService = async (id: number, updateProjectDto: ProjectDto) => {
    try {
        const validId = validateId(id);
        const validProjectDto = validateProjectDto(updateProjectDto);

        const project: Project = await updateProjectRepository(validId, validProjectDto)

        return project
    } catch (error: any) {
        handlePrismaError(error, "Project")
        throw error
    }
}

export const deleteProjectService = async (id: number) => {
    try {
        const validId = validateId(id);

        const project: Project = await deleteProjectRepository(validId)

        return project
    } catch (error: any) {
        handlePrismaError(error, "Project")
        throw error
    }
}
