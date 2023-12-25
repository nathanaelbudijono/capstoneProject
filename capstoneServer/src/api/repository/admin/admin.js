const prisma = require("../../../configs/connection");

// ----- # Get all Admin # ----- //
const findAdmin = async () => {
  const admin = await prisma.admins.findMany();

  return admin;
};

// ----- # Get admin by Id # ----- //
const findAdminById = async (id) => {
  try {
    const admin = await prisma.admins.findUnique({
      where: {
        id,
      },
    });
    return admin;
  } catch (err) {
    console.log(err);
  }
};

// ----- # Create Admin # ----- //
const insertAdmin = async (adminData, hashPassword) => {
  const admin = await prisma.users.create({
    data: {
      email: adminData.email,
      firstName: adminData.firstName,
      lastName: adminData.lastName,
      city: adminData.city,
      country: adminData.country,
      password: hashPassword,
      role: adminData.role,
    },
  });

  return admin;
};

// ----- # Update Admin By Id # ----- //
const updateAdmin = async (id, adminData) => {
  const admin = await prisma.admins.update({
    where: {
      id: id,
    },
    data: {
      firstName: adminData.firstName,
      lastName: adminData.lastName,
      city: adminData.city,
      country: adminData.country,
    },
  });
  return admin;
};

module.exports = {
  findAdmin,
  findAdminById,
  insertAdmin,
  updateAdmin,
};
