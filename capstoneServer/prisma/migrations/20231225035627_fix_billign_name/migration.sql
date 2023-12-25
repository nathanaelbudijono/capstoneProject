/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `Billing` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Billing_paymentId_key" ON "Billing"("paymentId");
