import { BadRequestError } from "../errors/BadRequestError";
import { ModuleDto } from "../interfaces/moduleDto.interface";
import { validateAllowedKeys } from "./allowedKeys.validator";

export const validateModuleDto = (moduleDto: ModuleDto) => {
    if (!moduleDto) {
        throw new BadRequestError("Module DTO is required")
    }

    validateAllowedKeys(moduleDto, ["name", "projectId"])

    const {name, projectId} = moduleDto;

    if (!name) {
        throw new BadRequestError("Name is required")
    }

    if (name.length < 2 || name.length > 32) {
        throw new BadRequestError("Name must be at least 2 characters long and at most 32 characters long")
    }

    if (!projectId) {
        throw new BadRequestError("Project ID is required")
    }

    if (typeof projectId !== "number") {
        throw new BadRequestError("Project ID must be a number")
    }

    return moduleDto
}