import { Prisma } from "@/generated/prisma/client"
import { ServiceUnavailableError } from "../errors/ServiceUnavailableError"
import { NotFoundError } from "../errors/NotFoundError"
import { BadRequestError } from "../errors/BadRequestError"
import { ConflictError } from "../errors/ConflictError"

export const handlePrismaError = (error: unknown) => {
    const KnownRequestError = Prisma.PrismaClientKnownRequestError

    if (!(error instanceof KnownRequestError))
        throw error

    switch (error.code) {
        case "P1001":
            throw new ServiceUnavailableError("Unable to connect to the database");
        case "P2002":
            throw new ConflictError("Resource already exists");
        case "P2003":
            throw new BadRequestError("Invalid input provided");
        case "P2025":
            throw new NotFoundError("Resource with this id doesn't exist");
        default:
            throw error
    }
}