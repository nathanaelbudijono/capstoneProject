-- CreateTable
CREATE TABLE "Billing" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "totalAmount" INTEGER,
    "paymentStatus" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usersId" TEXT,
    "layananId" TEXT,
    "dataKapalId" TEXT,

    CONSTRAINT "Billing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_layananId_fkey" FOREIGN KEY ("layananId") REFERENCES "Layanan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_dataKapalId_fkey" FOREIGN KEY ("dataKapalId") REFERENCES "DataKapal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
