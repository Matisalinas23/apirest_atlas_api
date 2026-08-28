import { BadRequestError } from "../errors/BadRequestError";
import { CreateEndpointDto, UpdateEndpointDto } from "../interfaces/endpoint.interface";
import { validateAllowedKeys } from "./allowedKeys.validator";
import { endpointDtoAllowedKeys, endpointUpdateDtoAllowedKeys } from "./allowedKeys/endpoint.allowedkeys";

// Validations must be in order from attributes appear in the interface

const nameValidations = (name: string) => {
    if (!name) {
        throw new BadRequestError("The name field is required.");
    }

    if (typeof name !== 'string') {
        throw new BadRequestError("The name must be a string.");
    }

    if (name.length <= 0 || name.length > 32) {
        throw new BadRequestError("The name must be between 1 and 32 characters long.");
    }
}

const moduleIdValidations = (moduleId: number) => {
    if (!moduleId) {
        throw new BadRequestError("The moduleId field is required.");
    }

    if (typeof moduleId !== 'number') {
        throw new BadRequestError("The moduleId must be a number.");
    }

    if (moduleId <= 0) {
        throw new BadRequestError("The moduleId must be a positive number.");
    }

    if (!Number.isInteger(moduleId)) {
        throw new BadRequestError("The moduleId must be an integer.");
    }
}

const pathValidations = (path: string) => {
    if (!path) {
        throw new BadRequestError("The path field is required.");
    }

    if (typeof path !== 'string') {
        throw new BadRequestError("The path must be a string.");
    }

    const pathRegex = /^\/([A-Za-z0-9_-]+|:[A-Za-z0-9_]+)(\/([A-Za-z0-9_-]+|:[A-Za-z0-9_]+))*\/?$/;
    
    if (!pathRegex.test(path)) {
        throw new BadRequestError("The path must start with '/' and can only contain alphanumeric characters, underscores, hyphens, and colons for parameters.");
    }

    if (path.charAt(0) !== '/') {
        throw new BadRequestError("The path must start with '/'.");
    }

    if (path.charAt(path.length - 1) === '/') {
        throw new BadRequestError("The path must not end with '/'.");
    }

    if (path.length > 64) {
        throw new BadRequestError("The path must not exceed 64 characters.");
    }
}

const methodValidations = (method: string) => {
    if (!method) {
        throw new BadRequestError("The method field is required.");
    }

    if (typeof method !== 'string') {
        throw new BadRequestError("The method must be a string.");
    }

    if (!['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'].includes(method)) {
        throw new BadRequestError("The method must be a valid HTTP method.");
    }
}

const descriptionValidations = (description: string) => {
    if (!description) {
        throw new BadRequestError("The description field is required.");
    }

    if (typeof description !== 'string') {
        throw new BadRequestError("The description must be a string.");
    }

    if (description.length <= 0 || description.length > 1024) {
        throw new BadRequestError("The description must be between 1 and 1024 characters long.");
    }
}

const notesValidations = (notes: string) => {
    if (!notes) {
        throw new BadRequestError("The notes field is required.");
    }

    if (typeof notes !== 'string') {
        throw new BadRequestError("The notes must be a string.");
    }

    if (notes.length <= 0 || notes.length > 256) {
        throw new BadRequestError("The notes must be between 1 and 256 characters long.");
    }
}

const tagsValidations = (tags: string[]) => {
    if (!tags) {
        throw new BadRequestError("The tags field is required.");
    }

    if (!Array.isArray(tags)) {
        throw new BadRequestError("The tags must be an array.");
    }

    if (tags.length < 0 || tags.length > 10) {
        throw new BadRequestError("The tags must be between 1 and 10 elements.");
    }

    if (tags.some((tag) => typeof tag !== 'string')) {
        throw new BadRequestError("The tags must be an array of strings.");
    }
}

const requestBodyValidations = (requestBody: string) => {
    if (!requestBody) {
        throw new BadRequestError("The requestBody field is required.");
    }

    if (typeof requestBody !== 'string') {
        throw new BadRequestError("The requestBody must be a string.");
    }

    if (requestBody.length <= 1 || requestBody.length > 4096) {
        throw new BadRequestError("The requestBody must be between 2 and 4096 characters long.");
    }

    try {
        const parsedBody = JSON.parse(requestBody);

        if (typeof parsedBody !== 'object' || Array.isArray(parsedBody)) {
            throw new BadRequestError("The requestBody must be a valid JSON object.");
        }
    } catch (error) {
        throw new BadRequestError("The requestBody must be a valid JSON.");
    }
}

export const validateEndpointUpdateDto = (updateEndpointDto: UpdateEndpointDto) => {
    if (!updateEndpointDto) {
        throw new BadRequestError("Endpoint update request body is required.");
    }

    validateAllowedKeys(updateEndpointDto, endpointUpdateDtoAllowedKeys);

    const { name, path, method, description, notes, tags, requestBody } = updateEndpointDto;

    nameValidations(name);
    pathValidations(path);
    methodValidations(method);
    descriptionValidations(description);
    notesValidations(notes);
    tagsValidations(tags);
    requestBodyValidations(requestBody);

    return updateEndpointDto;
}

export const validateEndpointDto = (endpointDto: CreateEndpointDto) => {
    if (!endpointDto) {
        throw new BadRequestError("Endpoint request body is required.");
    }

    validateAllowedKeys(endpointDto, endpointDtoAllowedKeys);

    const { name, moduleId, path, method, description, notes, tags, requestBody } = endpointDto;

    nameValidations(name);
    moduleIdValidations(moduleId);
    pathValidations(path);
    methodValidations(method);
    descriptionValidations(description);
    notesValidations(notes);
    tagsValidations(tags);
    requestBodyValidations(requestBody);

    return endpointDto;
}