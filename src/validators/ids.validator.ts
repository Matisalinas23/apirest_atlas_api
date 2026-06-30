import { TypeOfError } from "../errors/TypeOfError";

export const validateId = (id: number): number => {
    if (Number.isNaN(id)) {
        throw new TypeOfError("Id must be a valid number");
    }

    if (!Number.isInteger(id)) {
        throw new TypeOfError("Id must be an integer");
    }

    if (id <= 0) {
        throw new TypeOfError("Id must be a positive number");
    }

    return id;
}