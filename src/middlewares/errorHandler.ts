import { NextFunction, Request, Response } from "express";
import { Prisma } from "@/generated/prisma/client";
import { CustomError } from "@/errors/CustomError";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    const KnownRequestError = Prisma.PrismaClientKnownRequestError

    console.error(error);

    if (error instanceof KnownRequestError && error.code === "P1001") {
        return res.status(503).json({
            message: "Unable to connect to the database"
        })
    }

    if (error instanceof CustomError) {
        return res.status(error.statusCode).json({
            message: error.message
        });
    }

    return res.status(500).json({
        message: "Internal server error"
    });
}