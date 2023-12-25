/*
  Warnings:

  - You are about to drop the column `admin_id` on the `Layanan` table. All the data in the column will be lost.
  - You are about to drop the column `durasiPenggunaan` on the `Layanan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Layanan" DROP CONSTRAINT "Layanan_admin_id_fkey";

-- AlterTable
ALTER TABLE "Layanan" DROP COLUMN "admin_id",
DROP COLUMN "durasiPenggunaan",
ADD COLUMN     "companyId" TEXT;

-- AddForeignKey
ALTER TABLE "Layanan" ADD CONSTRAINT "Layanan_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
