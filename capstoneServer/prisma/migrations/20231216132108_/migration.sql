/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");
