/*
  Warnings:

  - You are about to drop the column `response` on the `Endpoint` table. All the data in the column will be lost.
  - Added the required column `method` to the `Endpoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Endpoint` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HttpMethod" AS ENUM ('GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD');

-- AlterTable
ALTER TABLE "Endpoint" DROP COLUMN "response",
ADD COLUMN     "method" "HttpMethod" NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Response" (
    "id" SERIAL NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "body" JSONB NOT NULL,
    "endpointId" INTEGER NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Response_endpointId_key" ON "Response"("endpointId");

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_endpointId_fkey" FOREIGN KEY ("endpointId") REFERENCES "Endpoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
