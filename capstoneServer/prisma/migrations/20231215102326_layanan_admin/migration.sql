/*
  Warnings:

  - Added the required column `admin_id` to the `Layanan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Layanan" ADD COLUMN     "admin_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Layanan" ADD CONSTRAINT "Layanan_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
