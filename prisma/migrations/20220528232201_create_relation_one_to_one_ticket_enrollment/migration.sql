/*
  Warnings:

  - You are about to drop the `Tickets` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ticketsId` to the `Enrollment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "ticketsId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Tickets";

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "type" "TicketType" NOT NULL,
    "hotel" BOOLEAN NOT NULL,
    "totalValue" INTEGER NOT NULL,
    "enrollmentId" INTEGER NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_enrollmentId_key" ON "Ticket"("enrollmentId");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
