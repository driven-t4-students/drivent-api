/*
  Warnings:

  - You are about to drop the column `ticketId` on the `Bed` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bedId]` on the table `tickets` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Bed" DROP CONSTRAINT "Bed_ticketId_fkey";

-- DropIndex
DROP INDEX "Bed_ticketId_key";

-- AlterTable
ALTER TABLE "Bed" DROP COLUMN "ticketId";

-- CreateIndex
CREATE UNIQUE INDEX "tickets_bedId_key" ON "tickets"("bedId");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_bedId_fkey" FOREIGN KEY ("bedId") REFERENCES "Bed"("id") ON DELETE SET NULL ON UPDATE CASCADE;
