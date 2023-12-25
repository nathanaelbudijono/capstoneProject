// ----- # API Route http://localhost:8080/api/layanan/company/~ # ----- //

const express = require("express");
const router = express.Router();

const {
  getAllLayanan,
  getLayananById,
  createLayanan,
  updateLayananById,
  deleteLayananById,
} = require("../../services/company/layanan.js");

// ----- # Get all Layanan # ----- //
// router.get("/getAllLayanan", async (req, res) => {
//   try {
//     const layanan = await getAllLayanan();
//     res.send(layanan);
//   } catch (err) {
//     console.log(err);
//   }
// });

// ----- # Get Boat By Id # ----- //
router.get("/getLayananById/:id", async (req, res) => {
  try {
    const layananId = req.params.id;
    const layanan = await getLayananById(layananId);

    res.send(layanan);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

// ----- # Create layanan # ----- //
router.post("/createLayanan", async (req, res) => {
  try {
    const newLayananData = req.body;
    const layanan = await createLayanan(newLayananData);

    res.send({
      data: layanan,
      message: "Layanan created successfully",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// ----- # Update boat # ----- //
router.put("/updateLayanan", async (req, res) => {
  try {
    const layananData = req.body;
    const { id } = layananData;
    if (
      !(
        id &&
        layananData.jenisLayanan &&
        layananData.durasiPenggunaan &&
        layananData.harga &&
        layananData.pelabuhan &&
        layananData.satuanKerja
      )
    ) {
      res.status(400).send("Missing parameters");
    }

    const layanan = await updateLayananById(id, layananData);

    res.send({
      data: layanan,
      message: "layanan updated successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

// ----- # Delet boat by Id# ----- //
router.delete("/deleteLayanan/:id", async (req, res) => {
  try {
    const layananId = req.params.id;

    await deleteLayananById(layananId);

    res.send({
      data: layanan,
      message: "layanan deleted successfully",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
