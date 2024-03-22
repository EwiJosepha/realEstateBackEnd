-- CreateTable
CREATE TABLE "Agent" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Properties" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "description" TEXT NOT NULL,
    "rooms" TEXT NOT NULL,
    "bath" INTEGER NOT NULL,
    "livingRooms" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "areaInKm" TEXT NOT NULL,
    "rentOrSale" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "images" TEXT[],
    "agentId" INTEGER NOT NULL,

    CONSTRAINT "Properties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agent_email_key" ON "Agent"("email");

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
