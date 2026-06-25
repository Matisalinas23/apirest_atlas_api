import { BadRequestError } from "../errors/BadRequestError"
import { CreateProjectDto } from "../interfaces/createProjectDto.interface"

export const validateCreateProject = (dtoProject: CreateProjectDto) => {
    const { name } = dtoProject
    if (!name) {
        throw new BadRequestError("Name is required")
    }

    if (name.length < 2 || name.length > 32) {
        throw new BadRequestError("Name must be at least 2 characters long and at most 32 characters long")
    }
}