const prisma = require("../../../configs/connection");

const insertBilling = async (dataBilling) => {
  try {
    const billing = await prisma.billing.create({
      data: {
        duration: dataBilling.duration,
        usersId: dataBilling.usersId,
        layananId: dataBilling.layananId,
        dataKapalId: dataBilling.dataKapalId,
        companyId: dataBilling.companyId,
        paymentId: dataBilling.paymentId,
      },
    });

    return billing;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  insertBilling,
};
