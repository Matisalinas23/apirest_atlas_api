import { Project } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { ProjectDto } from "../interfaces/projectDto.interface";

export const getProjectsRepository = async (): Promise<Project[]> => {
    const projects: Project[] = await prisma.project.findMany()

    return projects
}

export const createProjectRepository = async (projectDto: ProjectDto) => {
    const project: Project = await prisma.project.create({
        data: {
            name: projectDto.name
        }
    })

    return project
}

export const getProjectByIdRepository = async (id: number) => {
    const project: Project = await prisma.project.findUniqueOrThrow({
        where: { id },
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
}

export const updateProjectRepository = async (id: number, projectDto: ProjectDto) => {
    const project: Project = await prisma.project.update({
        where: { id },
        data: {
            name: projectDto.name
        }
    })

    return project
}

export const deleteProjectRepository = async (id: number) => {
    const project: Project = await prisma.project.delete({
        where: { id: id }
    })

    return project
}