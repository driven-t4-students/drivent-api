-- DropForeignKey
ALTER TABLE "Bed" DROP CONSTRAINT "Bed_ticketId_fkey";

-- AlterTable
ALTER TABLE "Bed" ALTER COLUMN "ticketId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Bed" ADD CONSTRAINT "Bed_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
