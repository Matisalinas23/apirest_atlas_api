import { NextFunction, Request, Response } from "express";
import { createProjectService, deleteProjectService, getProjectsService, updateProjectService } from "@/services/projects.service";
import { ProjectDto } from "../interfaces/createProjectDto.interface";

export const getProjectsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const projects = await getProjectsService();

        res.status(200).json({ projects });
    } catch (error: any) {
        next(error);
    }
}

export const createProjectController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const createProjectDto: ProjectDto = req.body;
        const project = await createProjectService(createProjectDto);

        res.status(201).json({ project });
    } catch (error: any) {
        next(error);
    }
}

export const deleteProjectController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const projectId = parseInt(req.params.id as string)
        const project = await deleteProjectService(projectId);

        res.status(200).json({
            message: "Project deleted successfully",
            project: project
        })
    } catch (error) {
        next(error);
    }
}

export const updateProjectController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log("En el controlador...")
    try {
        const projectId = parseInt(req.params.id as string);
        const updateProjectDto: ProjectDto = req.body;
        console.log("Llamando al servicio 'actualizar proyecto'...")
        const project = await updateProjectService(projectId, updateProjectDto);

        console.log("Respuesta en curso...")
        res.status(200).json({ project })
    } catch (error) {
        next(error);
    }
}
