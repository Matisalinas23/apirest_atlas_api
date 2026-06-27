import { BadRequestError } from "../errors/BadRequestError"
import { ProjectDto } from "../interfaces/createProjectDto.interface"
import { validateAllowedKeys } from "./allowedKeys.validator";

export const validateProjectDto = (dtoProject: ProjectDto) => {
    if (!dtoProject) {
        throw new BadRequestError("dto de proyecto es requerido")
    }

    validateAllowedKeys(dtoProject, ["name"]);

    const { name } = dtoProject;

    if (!name) {
        throw new BadRequestError("Name is required")
    }

    if (name.length < 2 || name.length > 32) {
        throw new BadRequestError("Name must be at least 2 characters long and at most 32 characters long")
    }

    return dtoProject
}