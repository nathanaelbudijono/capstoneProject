const { insertCompany } = require("../../repository/company/company.js");
const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);

// ----- # Create Company # ----- //
const createCompany = async (companyData) => {
  try {
    const { password } = companyData;
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = await insertCompany(companyData, hashPassword);

    return user;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createCompany };
