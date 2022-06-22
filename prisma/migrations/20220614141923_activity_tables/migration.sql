/*
  Warnings:

  - A unique constraint covering the columns `[activitySubscriptionId]` on the table `tickets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ActivityPlace" AS ENUM ('main', 'side', 'workshop');

-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "activitySubscriptionId" INTEGER;

-- CreateTable
CREATE TABLE "activities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "startsAt" TIME NOT NULL,
    "endsAt" TIME NOT NULL,
    "place" "ActivityPlace" NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activitiesSubscription" (
    "id" SERIAL NOT NULL,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "activitiesSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tickets_activitySubscriptionId_key" ON "tickets"("activitySubscriptionId");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_activitySubscriptionId_fkey" FOREIGN KEY ("activitySubscriptionId") REFERENCES "activitiesSubscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activitiesSubscription" ADD CONSTRAINT "activitiesSubscription_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
