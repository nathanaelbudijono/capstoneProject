const prisma = require("../../../configs/connection");

// ----- # Create User # ----- //
const insertCompany = async (companyData, hashPassword) => {
  try {
    const company = await prisma.company.create({
      data: {
        companyId: companyData.companyID,
        name: companyData.name,
        city: companyData.city,
        country: companyData.country,
        phone: companyData.phoneNumber,
        email: companyData.email,
        password: hashPassword,
      },
    });

    return company;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  insertCompany,
};
