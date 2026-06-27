import { BadRequestError } from "../errors/BadRequestError"
import { ProjectDto } from "../interfaces/projectDto.interface"
import { validateAllowedKeys } from "./allowedKeys.validator";

export const validateProjectDto = (projectDto: ProjectDto) => {
    if (!projectDto) {
        throw new BadRequestError("dto de proyecto es requerido")
    }

    validateAllowedKeys(projectDto, ["name"]);

    const { name } = projectDto;

    if (!name) {
        throw new BadRequestError("Name is required")
    }

    if (name.length < 2 || name.length > 32) {
        throw new BadRequestError("Name must be at least 2 characters long and at most 32 characters long")
    }

    return projectDto
}