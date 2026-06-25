import { NextFunction, Request, Response } from "express";
import { createProjectService, deleteProjectService, getProjectsService } from "@/services/projects.service";

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
        const project = await createProjectService(req.body);

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
