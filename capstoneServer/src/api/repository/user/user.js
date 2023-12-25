const prisma = require("../../../configs/connection");

// ----- # Get User By ID # ----- //
const findUserById = async (id) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
  }
};

// ----- # Create User # ----- //
const insertUser = async (userData, hashPassword) => {
  try {
    const user = await prisma.users.create({
      data: {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        city: userData.city,
        country: userData.country,
        password: hashPassword,
        role: userData.role,
        phoneNumber: userData.phoneNumber,
        DOB: userData.dob,
      },
    });

    return user;
  } catch (err) {
    console.log(err);
  }
};

// ----- # Update User By Ids # ----- //
const updateUser = async (id, userData) => {
  try {
    const user = await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        city: userData.city,
        country: userData.country,
      },
    });
    return user;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  findUserById,
  insertUser,
  updateUser,
};
