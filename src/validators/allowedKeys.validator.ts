import { BadRequestError } from "../errors/BadRequestError";

export const validateAllowedKeys = <T extends object>(dto: T, allowedKeys: string[]) => {
    const receivedKeys = Object.keys(dto);
    const invalidKeys = receivedKeys.filter(key => !allowedKeys.includes(key));

    if (invalidKeys.length > 0) {
        throw new BadRequestError(`Unexpected properties: ${invalidKeys.join(", ")}`)
    }
}