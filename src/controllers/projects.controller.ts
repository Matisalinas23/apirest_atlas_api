import { NextFunction, Request, Response } from "express";
import { createProjectService, deleteProjectService, getProjectByIdService, getProjectsService, updateProjectService } from "@/services/projects.service";
import { ProjectDto } from "../interfaces/projectDto.interface";
import { BadRequestError } from "../errors/BadRequestError";

export const getProjectsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const projects = await getProjectsService();

        res.status(200).json({ projects });
    } catch (error) {
        next(error);
    }
}

export const createProjectController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const createProjectDto: ProjectDto = req.body;
        const project = await createProjectService(createProjectDto);

        res.status(201).json({ project });
    } catch (error) {
        next(error);
    }
}

export const deleteProjectController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const projectId = Number(req.params.id);

        if (Number.isNaN(projectId)) {
            throw new BadRequestError("Invalid project id");
        }

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
    try {
        const projectId = Number(req.params.id);

        if (Number.isNaN(projectId)) {
            throw new BadRequestError("Invalid project id");
        }

        const updateProjectDto: ProjectDto = req.body;
        const project = await updateProjectService(projectId, updateProjectDto);

        res.status(200).json({ project })
    } catch (error) {
        next(error);
    }
}

export const getProjectByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const projectId = Number(req.params.id);

        if (Number.isNaN(projectId)) {
            throw new BadRequestError("Invalid project id");
        }

        const project = await getProjectByIdService(projectId);

        res.status(200).json({ project });
    } catch (error) {
        next(error);
    }
}
