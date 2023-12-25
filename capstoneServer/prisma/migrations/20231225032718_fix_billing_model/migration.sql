/*
  Warnings:

  - You are about to drop the column `billingId` on the `Payment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_billingId_fkey";

-- DropIndex
DROP INDEX "Payment_billingId_key";

-- AlterTable
ALTER TABLE "Billing" ADD COLUMN     "paymentId" TEXT;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "billingId";

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
