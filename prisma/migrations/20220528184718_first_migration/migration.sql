-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('online', 'presencial');

-- CreateTable
CREATE TABLE "Tickets" (
    "id" SERIAL NOT NULL,
    "type" "TicketType" NOT NULL,
    "hotel" BOOLEAN NOT NULL,
    "totalValue" INTEGER NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);
