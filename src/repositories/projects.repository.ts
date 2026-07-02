import { prisma } from "@/lib/prisma";
import { ProjectCompleteResponse, ProjectDto, ProjectResponse } from "../interfaces/project.interface";

export const getProjectsRepository = async (): Promise<ProjectResponse[]> => {
    const projects: ProjectResponse[] = await prisma.project.findMany()

    return projects
}

export const createProjectRepository = async (projectDto: ProjectDto): Promise<ProjectResponse> => {
    const project: ProjectResponse = await prisma.project.create({
        data: {
            name: projectDto.name
        }
    })

    return project
}

export const getProjectByIdRepository = async (id: number): Promise<ProjectCompleteResponse> => {
    const project: ProjectCompleteResponse = await prisma.project.findUniqueOrThrow({
        where: { id },
        include: {
            modules: {
                include: {
                    modules: true,
                    endpoints: true
                },
            }
        }
    })

    return project
}

export const updateProjectRepository = async (id: number, projectDto: ProjectDto): Promise<ProjectResponse> => {
    const project: ProjectResponse = await prisma.project.update({
        where: { id },
        data: {
            name: projectDto.name
        }
    })

    return project
}

export const deleteProjectRepository = async (id: number): Promise<ProjectResponse> => {
    const project: ProjectResponse = await prisma.project.delete({
        where: { id: id }
    })

    return project
}