-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lastModifyDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "moduleId" INTEGER,
    "name" TEXT NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Endpoint" (
    "id" SERIAL NOT NULL,
    "moduleId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "tags" TEXT[],
    "requestBody" JSONB NOT NULL,
    "response" JSONB NOT NULL,

    CONSTRAINT "Endpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PathParameter" (
    "id" SERIAL NOT NULL,
    "endpointId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PathParameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QueryParameter" (
    "id" SERIAL NOT NULL,
    "endpointId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "QueryParameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Header" (
    "id" SERIAL NOT NULL,
    "endpointId" INTEGER NOT NULL,
    "header" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Header_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_name_key" ON "Project"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Module_name_key" ON "Module"("name");

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endpoint" ADD CONSTRAINT "Endpoint_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PathParameter" ADD CONSTRAINT "PathParameter_endpointId_fkey" FOREIGN KEY ("endpointId") REFERENCES "Endpoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueryParameter" ADD CONSTRAINT "QueryParameter_endpointId_fkey" FOREIGN KEY ("endpointId") REFERENCES "Endpoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Header" ADD CONSTRAINT "Header_endpointId_fkey" FOREIGN KEY ("endpointId") REFERENCES "Endpoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
