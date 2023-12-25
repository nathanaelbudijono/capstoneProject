// ----- # API Route http://localhost:8080/api/userpayment/~ # ----- //
const express = require("express");
const router = express.Router();
const prisma = require("../../../configs/connection");

// ----- # get pending payment by id # ----- //
router.get("/getPendingPayment/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const userPayment = await prisma.payment.findMany({
      where: { usersId: userId, status: "Pending" },
      include: {
        Billing: {
          include: {
            Layanan: true,
            Company: true,
            DataKapal: true,
          },
        },
      },
    });

    const mappedUserPayments = userPayment.map((payment) => ({
      id: payment.id,
      status: payment.status,
      totalAmount: payment.Billing.reduce(
        (acc, billing) => acc + billing.duration * billing.Layanan.harga,
        0
      ),
      date: payment.paymentDate,
      namaKapal: payment.Billing.map((billing) => billing.DataKapal.namaKapal),
    }));

    res.json(mappedUserPayments);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// ----- # get paid payment by id # ----- //
router.get("/getPaidPayment/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const userPayment = await prisma.payment.findMany({
      where: { usersId: userId, status: "Paid" },
      include: {
        Billing: {
          include: {
            Layanan: true,
            Company: true,
            DataKapal: true,
          },
        },
      },
    });

    const mappedUserPayments = userPayment.map((payment) => ({
      id: payment.id,
      status: payment.status,
      totalAmount: payment.Billing.reduce(
        (acc, billing) => acc + billing.duration * billing.Layanan.harga,
        0
      ),
      date: payment.paymentDate,
      namaKapal: payment.Billing.map((billing) => billing.DataKapal.namaKapal),
    }));

    res.json(mappedUserPayments);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// ----- # get all payment detauk by id # ----- //

router.get("/getPaymentDetail/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const userPayment = await prisma.payment.findMany({
      where: { id: id },
      include: {
        Billing: {
          select: {
            duration: true,
            layananId: true,
            DataKapal: true,
            Company: { select: { name: true } },
          },
        },
      },
    });

    // Fetch Layanan details separately using the included Layanan IDs
    const billingIds = userPayment.flatMap((payment) =>
      payment.Billing.map((billing) => billing.layananId)
    );
    const layananDetails = await prisma.layanan.findMany({
      where: { id: { in: billingIds } },
      select: {
        id: true,
        jenisLayanan: true,
        harga: true,
        pelabuhan: true,
        satuanKerja: true,
        Company: { select: { name: true } },
      },
    });

    // Map the userPayment to include only the desired fields
    const mappedUserPayment = userPayment.map((payment) => ({
      id: payment.id,
      status: payment.status,
      totalAmount: payment.Billing.reduce(
        (acc, billing) =>
          acc +
          billing.duration *
            layananDetails.find((layanan) => layanan.id === billing.layananId)
              .harga,
        0
      ),
      paymentDate: payment.paymentDate,
      Billing: payment.Billing.map((billing) => ({
        duration: billing.duration,
        Layanan: {
          jenisLayanan: layananDetails.find(
            (layanan) => layanan.id === billing.layananId
          ).jenisLayanan,
          harga: layananDetails.find(
            (layanan) => layanan.id === billing.layananId
          ).harga,
          pelabuhan: layananDetails.find(
            (layanan) => layanan.id === billing.layananId
          ).pelabuhan,
          satuanKerja: layananDetails.find(
            (layanan) => layanan.id === billing.layananId
          ).satuanKerja,
        },
        DataKapal: billing.DataKapal
          ? {
              namaKapal: billing.DataKapal.namaKapal,
              jenisKapal: billing.DataKapal.jenisKapal,
            }
          : undefined,
        Company: billing.Company
          ? {
              name: billing.Company.name,
            }
          : undefined,
      })),
    }));

    res.json(mappedUserPayment);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
