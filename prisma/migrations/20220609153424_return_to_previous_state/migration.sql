/*
  Warnings:

  - You are about to drop the `ticket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bed" DROP CONSTRAINT "Bed_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_enrollmentId_fkey";

-- DropTable
DROP TABLE "ticket";

-- CreateTable
CREATE TABLE "tickets" (
    "id" SERIAL NOT NULL,
    "type" "TicketType" NOT NULL,
    "hotel" BOOLEAN NOT NULL DEFAULT false,
    "totalValue" INTEGER NOT NULL,
    "enrollmentId" INTEGER NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tickets_enrollmentId_key" ON "tickets"("enrollmentId");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "enrollments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bed" ADD CONSTRAINT "Bed_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
