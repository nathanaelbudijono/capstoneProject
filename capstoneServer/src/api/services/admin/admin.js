const {
  findAdminById,
  insertAdmin,
  updateAdmin,
} = require("../../repository/admin/admin.js");
const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);

// ----- # Get admin By ID # ----- //
const getAdminById = async (id) => {
  try {
    const admin = await findAdminById(id);
    if (!admin) {
      throw new Error("admin not found");
    }
    return admin;
  } catch (err) {
    console.log(err);
  }
};

// ----- # Create admin # ----- //
const createAdmin = async (newAdminData) => {
  try {
    const { password } = newAdminData;
    const hashPassword = bcrypt.hashSync(password, salt);
    const admin = await insertAdmin(newAdminData, hashPassword);

    return admin;
  } catch (err) {
    console.log(err);
  }
};

// ----- # Update admin By Id # ----- //
const updateAdminById = async (id, adminData) => {
  try {
    await getAdminById(id);
    const admin = await updateAdmin(id, adminData);
    return admin;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAdminById,
  createAdmin,
  updateAdminById,
};
