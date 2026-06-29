import { TypeOfError } from "../errors/TypeOfError";

export const validateId = (id: number) => {
    if (typeof id !== "number") {
        throw new TypeOfError("Id must be a number");
    }

    if (id <= 0) {
        throw new TypeOfError("Id must be a positive number");
    }

    if (isNaN(id)) {
        throw new TypeOfError("Id must be a valid number");
    }

    return id;
}