import { Prisma } from "@/generated/prisma/client"
import { ServiceUnavailableError } from "../errors/ServiceUnavailableError"
import { NotFoundError } from "../errors/NotFoundError"
import { BadRequestError } from "../errors/BadRequestError"
import { ConflictError } from "../errors/ConflictError"
import { ColumnNotFound } from "../errors/ColumnNotFound"

export const handlePrismaError = (error: unknown, resource: string) => {
    const KnownRequestError = Prisma.PrismaClientKnownRequestError

    if (!(error instanceof KnownRequestError))
        throw error

    const originalMessage = (
        error.meta?.driverAdapterError as {
            cause?: {
                originalMessage?: string;
            };
        } | undefined
    )?.cause?.originalMessage;

    switch (error.code) {
        case "P1001":
            throw new ServiceUnavailableError("Unable to connect to the database");
        case "P2002":
            throw new ConflictError(`${originalMessage ?? `${resource} with this name already exists`}`);
        case "P2003":
            throw new BadRequestError(originalMessage ?? `${resource} sent with invalid input`);
        case "P2022":
            throw new ColumnNotFound(originalMessage ?? `The column ${resource} doesn't exist`);
        case "P2025":
            throw new NotFoundError(originalMessage ?? `${resource} with this id doesn't exist`);
        default:
            throw error
    }
}