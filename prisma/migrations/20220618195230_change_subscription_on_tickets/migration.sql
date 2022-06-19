/*
  Warnings:

  - You are about to drop the column `activitySubscriptionId` on the `tickets` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_activitySubscriptionId_fkey";

-- DropIndex
DROP INDEX "tickets_activitySubscriptionId_key";

-- AlterTable
ALTER TABLE "activitiesSubscription" ADD COLUMN     "ticketId" INTEGER;

-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "activitySubscriptionId";

-- AddForeignKey
ALTER TABLE "activitiesSubscription" ADD CONSTRAINT "activitiesSubscription_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
