import { NextFunction, Request, Response } from "express"
import { createModuleService, getModulesService } from "../services/modules.service"
import { ModuleDto } from "../interfaces/moduleDto.interface"

export const createModuleController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const createModuleDto: ModuleDto = req.body;
        const module = await createModuleService(createModuleDto)

        res.status(201).json({ module })
    } catch (error) {
        next(error)
    }
}

export const getModulesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const modules = await getModulesService()

        res.status(200).json({ modules })
    } catch (error) {
        next(error)
    }
}