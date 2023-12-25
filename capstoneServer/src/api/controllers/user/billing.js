// ----- # API Route http://localhost:8080/api/userbilling/~ # ----- //

const express = require("express");
const router = express.Router();
const prisma = require("../../../configs/connection");

// ----- # get all billing by id # ----- //
router.get("/getAllBilling/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const userBilling = await prisma.billing.findMany({
      where: { usersId: userId },
      include: {
        Users: true,
        Layanan: {
          include: {
            Company: true,
          },
        },
        DataKapal: true,
      },
    });
    res.json(userBilling);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// ----- # get billing by boat id # ----- //
router.get("/getBillsByBoat/:id", async (req, res) => {
  try {
    const boatId = req.params.id;

    const boatBilling = await prisma.billing.findMany({
      where: { dataKapalId: boatId },
      include: {
        Users: true,
        Layanan: {
          include: {
            Company: true,
          },
        },
        DataKapal: true,
      },
    });
    res.json(boatBilling);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// ----- # get billing by id # ----- //
router.get("/getBillsById/:id", async (req, res) => {
  try {
    const billId = req.params.id;

    const Billing = await prisma.billing.findMany({
      where: { id: billId },
      include: {
        Users: true,
        Layanan: {
          include: {
            Company: true,
          },
        },
        DataKapal: true,
      },
    });
    res.json(Billing);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// ----- # get billing total by boatid # ----- //
router.get("/getTotalPriceByBoat/:id", async (req, res) => {
  try {
    const boatId = req.params.id;

    const userBilling = await prisma.billing.findMany({
      where: { dataKapalId: boatId },
      include: {
        Layanan: true,
      },
    });

    const totalPrice = userBilling.reduce((acc, billing) => {
      const { duration, Layanan } = billing;
      const totalAmount = duration * Layanan.harga;
      return acc + totalAmount;
    }, 0);

    res.json({ totalPrice });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// ----- # get billing total by userid # ----- //
// router.get("/getBillsByUser/:id", async (req, res) => {
//   try {
//     const { paymentId } = req.body;

//     const payment = await prisma.payment.findUnique({
//       where: { id: paymentId },
//       include: {
//         Billing: {
//           include: {
//             Layanan: true,
//             Company: true,
//           },
//         },
//       },
//     });

//     if (!payment) {
//       return res.status(404).json({ success: false, message: "Payment not found." });
//     }

//     const updatedPayments = await Promise.all(payment.Billing.map(async (billing) => {
//       const totalBilling = billing.duration * billing.Layanan.harga;

//       // Update company wallet
//       const updatedCompany = await prisma.company.update({
//         where: { id: billing.companyId },
//         data: {
//           wallet: {
//             increment: totalBilling,
//           },
//         },
//       });

//       // Update user wallet
//       const updatedUser = await prisma.users.update({
//         where: { id: payment.usersId },
//         data: {
//           wallet: {
//             decrement: billing.duration * billing.Layanan.harga,
//           },
//         },
//       });

//       // Update payment status to "Paid" and get the current date
//       const updatedPayment = await prisma.payment.update({
//         where: { id: payment.id },
//         data: {
//           status: "Paid",
//           paymentDate: new Date(),
//         },
//       });

//       return {
//         companyId: updatedCompany.companyId,
//         totalBilling,
//         userWalletAfterPayment: updatedUser.wallet,
//         paymentDate: updatedPayment.paymentDate,
//       };
//     }));

//     res.json({ success: true, updatedPayments });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// });

// ----- # pay billing by payment id # ----- //
router.post("/makePayment", async (req, res) => {
  try {
    const { paymentId } = req.body;
    console.log(req.body);

    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        Billing: {
          include: {
            Layanan: true,
            Company: true,
          },
        },
      },
    });
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found." });
    }

    const updatedPayments = await Promise.all(
      payment.Billing.map(async (billing) => {
        const totalBilling = billing.duration * billing.Layanan.harga;

        // Update company wallet
        const updatedCompany = await prisma.company.update({
          where: { id: billing.Company.id },
          data: {
            wallet: {
              increment: totalBilling,
            },
          },
        });

        // Update user wallet
        const updatedUser = await prisma.users.update({
          where: { id: payment.usersId },
          data: {
            wallet: {
              decrement: totalBilling,
            },
          },
        });

        await prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: "Paid",
            paymentDate: new Date().toISOString(),
          },
        });

        return {
          companyId: billing.Company.id,
          totalAmount: totalBilling,
          companyWalletAfterPayment: updatedCompany.wallet,
          userWalletAfterPayment: updatedUser.wallet,
        };
      })
    );

    res.json({ success: true, updatedPayments });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
