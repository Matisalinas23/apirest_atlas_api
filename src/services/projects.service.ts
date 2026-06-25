import { Prisma, Project } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { ConflictError } from "../errors/ConflictError";
import { CreateProjectDto } from "@/interfaces/createProjectDto.interface";
import { validateCreateProject } from "../validators/project.validator";

const KnownRequestError = Prisma.PrismaClientKnownRequestError

export const getProjectsService = async () => {
    try {
        const projects: Project[] = await prisma.project.findMany()

        return projects
    } catch (error) {
        throw error
    }
}

export const createProjectService = async (dtoProject: CreateProjectDto) => {
    try {
        validateCreateProject(dtoProject);

        const project: Project = await prisma.project.create({
            data: {
                name: dtoProject.name,
            }
        })

        return project
    } catch (error: any) {
        if (error instanceof KnownRequestError && error.code === "P2002") {
            throw new ConflictError("A project with this name already exists.");
        }

        throw error
    }
}
