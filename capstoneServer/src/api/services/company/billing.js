const { insertBilling } = require("../../repository/company/billing.js");

// ----- # Create Company # ----- //
const createBilling = async (dataBilling) => {
  try {
    const bill = await insertBilling(dataBilling);

    return bill;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createBilling };
