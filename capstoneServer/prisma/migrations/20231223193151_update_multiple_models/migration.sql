-- AlterTable
ALTER TABLE "Billing" ADD COLUMN     "companyId" TEXT;

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "wallet" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "wallet" INTEGER DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
