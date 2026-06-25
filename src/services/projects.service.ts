import { Prisma, Project } from "../../generated/prisma/client";
import { InternalServerError } from "../errors/InternalServerError";
import { prisma } from "../lib/prisma";

const KnownRequestError = Prisma.PrismaClientKnownRequestError

export const getProjectsService = async () => {
    try {
        const projects: Project[] = await prisma.project.findMany()

        return projects
    } catch (error) {
        if (error instanceof KnownRequestError && error.code === "P1001") {
            throw new InternalServerError("Database connection failed")
        }

        throw error
    }
}