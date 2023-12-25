/*
  Warnings:

  - You are about to drop the column `kapasitasPenumpang` on the `DataKapal` table. All the data in the column will be lost.
  - Added the required column `chassis` to the `DataKapal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kapasitasKapal` to the `DataKapal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noMesin` to the `DataKapal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggalBuat` to the `DataKapal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warna` to the `DataKapal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DataKapal" DROP COLUMN "kapasitasPenumpang",
ADD COLUMN     "chassis" TEXT NOT NULL,
ADD COLUMN     "kapasitasKapal" INTEGER NOT NULL,
ADD COLUMN     "noMesin" TEXT NOT NULL,
ADD COLUMN     "tanggalBuat" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "warna" TEXT NOT NULL,
ALTER COLUMN "kapalAktif" DROP NOT NULL,
ALTER COLUMN "dermaga" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "DOB" DROP DEFAULT;
