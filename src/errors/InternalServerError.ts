import { CustomError } from "./customError";

export class InternalServerError extends CustomError {
    constructor(message: string) {
        super(message, 500)
    }
}