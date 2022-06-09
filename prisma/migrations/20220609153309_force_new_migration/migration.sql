/*
  Warnings:

  - You are about to drop the `tickets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bed" DROP CONSTRAINT "Bed_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_enrollmentId_fkey";

-- DropTable
DROP TABLE "tickets";

-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "type" "TicketType" NOT NULL,
    "hotel" BOOLEAN NOT NULL DEFAULT false,
    "totalValue" INTEGER NOT NULL,
    "enrollmentId" INTEGER NOT NULL,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ticket_enrollmentId_key" ON "ticket"("enrollmentId");

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "enrollments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bed" ADD CONSTRAINT "Bed_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE SET NULL ON UPDATE CASCADE;
