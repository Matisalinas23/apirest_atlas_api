import { Prisma } from "@/generated/prisma/client"

export interface ResponseResponse {
    id: number
    statusCode: number
    body: Prisma.JsonValue

    endpointId: number
}