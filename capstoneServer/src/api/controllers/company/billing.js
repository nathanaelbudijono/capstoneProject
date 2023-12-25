// ----- # API Route http://localhost:8080/api/billing/company/~ # ----- //

const express = require("express");
const router = express.Router();
const prisma = require("../../../configs/connection");

const { createBilling } = require("../../services/company/billing.js");

// router.post("/createBilling", async (req, res) => {
//   try {
//     const dataBilling = req.body;

//     const result = await createBilling(dataBilling);

//     const existingBilling = await prisma.billing.findMany({
//       where: { dataKapalId: dataBilling.dataKapalId },
//     });

//     let bills, payment;

//     if (existingBilling.length > 1) {
//       // Update the totalAmount in the payment
//       const userBilling = await prisma.billing.findMany({
//         where: { dataKapalId: dataBilling.dataKapalId },
//         include: {
//           Layanan: true,
//         },
//       });

//       const userPayment = await prisma.payment.findUnique({
//         where: { billingId: userBilling[0].id },
//       });

//       const totalPrice = userBilling.reduce((acc, billing) => {
//         const { duration, Layanan } = billing;
//         const totalAmount = duration * Layanan.harga;
//         return acc + totalAmount;
//       }, 0);

//       payment = await prisma.payment.update({
//         where: { billingId: userPayment.billingId },
//         data: {
//           totalAmount: totalPrice,
//         },
//       });
//     } else {
//       const createdBill = await prisma.billing.findMany({
//         where: { dataKapalId: dataBilling.dataKapalId },
//         include: {
//           Layanan: true,
//         },
//       });

//       const initialTotalAmount =
//         dataBilling.duration * createdBill[0].Layanan.harga;

//       payment = await prisma.payment.create({
//         data: {
//           billingId: result.id,
//           totalAmount: initialTotalAmount,
//           usersId: dataBilling.usersId,
//         },
//       });

//       bills = result.bills;
//     }

//     return res.json({
//       data: { bills, payment },
//       message: "Billing created or updated successfully",
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(400).send(err.message);
//   }
// });

router.post("/createBilling", async (req, res) => {
  try {
    const { duration, usersId, layananId, dataKapalId, companyId } = req.body;

    const existingBilling = await prisma.billing.findFirst({
      where: {
        dataKapalId: dataKapalId,
      },
      include: {
        payment: true,
        Layanan: true,
      },
    });

    const getLayanan = await prisma.layanan.findUnique({
      where: {
        id: layananId,
      },
    });
    const payment = existingBilling
      ? existingBilling.payment
      : await prisma.payment.create({
          data: {
            usersId: usersId,
          },
        });

    const harga = getLayanan.harga || 0;
    const totalAmount = harga * duration;
    console.log(totalAmount);
    await prisma.billing.create({
      data: {
        duration: duration,
        usersId: usersId,
        layananId: layananId,
        dataKapalId: dataKapalId,
        companyId: companyId,
        paymentId: payment.id,
      },
    });

    await prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        totalAmount: payment.totalAmount + totalAmount,
      },
    });
    res.json({ success: true, payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

router.get("/getboatbyid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const boat = await prisma.dataKapal.findMany({
      where: {
        users_id: id,
      },
    });
    res.send({
      data: boat,
      message: "Users get successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const user = await prisma.users.findMany();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
