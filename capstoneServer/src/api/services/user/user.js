const {
  findUserById,
  insertUser,
  updateUser,
} = require("../../repository/user/user.js");
const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);

// ----- # Get User By ID # ----- //
const getUserById = async (id) => {
  try {
    const user = await findUserById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (err) {
    console.log(err);
  }
};

// ----- # Create User # ----- //
const createUser = async (newUserData) => {
  try {
    const { password } = newUserData;
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = await insertUser(newUserData, hashPassword);

    return user;
  } catch (err) {
    console.log(err);
  }
};

// ----- # Update User By Id # ----- //
const updateUserById = async (id, userData) => {
  try {
    await getUserById(id);
    const user = await updateUser(id, userData);
    return user;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getUserById,
  createUser,
  updateUserById,
  getUserById,
};
