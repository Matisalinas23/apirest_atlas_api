import { CustomError } from "./CustomError";

export class ServiceUnavailableError extends CustomError {
    constructor(message: string) {
        super(message, 503);
    }
}