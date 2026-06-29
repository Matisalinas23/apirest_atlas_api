import { CustomError } from "./CustomError";

export class TypeOfError extends CustomError {
    constructor(message: string) {
        super(message, 400);
    }
}