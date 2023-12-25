/*
  Warnings:

  - Made the column `DOB` on table `Admin` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "DOB" SET NOT NULL,
ALTER COLUMN "DOB" SET DEFAULT CURRENT_TIMESTAMP;
