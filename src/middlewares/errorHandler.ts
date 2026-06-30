import { NextFunction, Request, Response } from "express";
import { CustomError } from "@/errors/CustomError";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);

    if (error instanceof CustomError) {
        return res.status(error.statusCode).json({
            message: error.message
        });
    }

    return res.status(500).json({
        message: "Internal server error"
    });
}