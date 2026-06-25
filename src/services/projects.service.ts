import { Project } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export const getProjectsService = async () => {
    try {
        const projects: Project[] = await prisma.project.findMany()

        return projects
    } catch (error) {
        throw error
    }
}

export const createProjectService = async () => {
    try {
        console.log("En el servicio...")
    } catch (error) {
        
    }
}
