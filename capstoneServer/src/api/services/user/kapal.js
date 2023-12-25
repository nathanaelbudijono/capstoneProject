const {
  findKapal,
  findKapalId,
  insertKapal,
  updateKapal,
  deleteKapal,
} = require("../../repository/user/kapal.js");

// ----- # Get All Boat # ----- //
const getAllKapal = async () => {
  try {
    const user = await findKapal();
    return user;
  } catch (err) {
    console.log(err);
  }
};

// ----- # Get Boat By Id# ----- //
const getKapalById = async (id) => {
  try {
    const user = await findKapalId(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (err) {
    console.log(err);
  }
};

// ----- # Create Boat # ----- //
const createKapal = async (newDataKapal) => {
  try {
    const user = await insertKapal(newDataKapal);

    return user;
  } catch (err) {
    console.log(err);
  }
};

// ----- # Update Boat # ----- //
const updateKapalById = async (id, dataKapal) => {
  try {
    await getKapalById(id);

    const user = await updateKapal(id, dataKapal);

    return user;
  } catch (err) {
    console.log(err);
  }
};

// ----- # Delete Boat # ----- //
const deleteKapalById = async (id) => {
  try {
    await getProductById(id);

    await deleteKapal(id);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllKapal,
  getKapalById,
  createKapal,
  updateKapalById,
  deleteKapalById,
};
