/*
  Warnings:

  - Added the required column `users_id` to the `DataKapal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DataKapal" ADD COLUMN     "users_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "profilePicture" (
    "id" TEXT NOT NULL,
    "users_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profilePicture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profilePicture_users_id_key" ON "profilePicture"("users_id");

-- AddForeignKey
ALTER TABLE "profilePicture" ADD CONSTRAINT "profilePicture_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataKapal" ADD CONSTRAINT "DataKapal_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
