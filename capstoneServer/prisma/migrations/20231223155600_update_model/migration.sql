/*
  Warnings:

  - You are about to drop the column `paymentStatus` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `Billing` table. All the data in the column will be lost.
  - Added the required column `duration` to the `Billing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Billing" DROP COLUMN "paymentStatus",
DROP COLUMN "totalAmount",
ADD COLUMN     "duration" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "totalAmount" INTEGER NOT NULL,
    "paymentDate" TEXT NOT NULL,
    "billingId" TEXT,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_billingId_key" ON "Payment"("billingId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_billingId_fkey" FOREIGN KEY ("billingId") REFERENCES "Billing"("id") ON DELETE SET NULL ON UPDATE CASCADE;
