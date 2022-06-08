/*
  Warnings:

  - You are about to drop the `Hotel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Hotel";

-- CreateTable
CREATE TABLE "hotels" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "hotels_pkey" PRIMARY KEY ("id")
);
