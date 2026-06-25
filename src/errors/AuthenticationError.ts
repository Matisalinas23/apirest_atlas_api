import { CustomError } from "./customError";

export class AuthenticationError extends CustomError {
    constructor(message: string) {
        super(message, 401);
    }
}