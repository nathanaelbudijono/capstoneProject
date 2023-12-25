// ----- # API Route http://localhost:8080/api/kapal/user/~ # ----- //

const express = require("express");
const router = express.Router();

const {
  getAllKapal,
  getKapalById,
  createKapal,
  updateKapalById,
  deleteKapalById,
} = require("../../services/user/kapal.js");

// ----- # Get all Boat # ----- //
router.get("/getallboat", async (req, res) => {
  try {
    const kapal = await getAllKapal();
    res.send(kapal);
  } catch (err) {
    console.log(err);
  }
});

// ----- # Get Boat By Id # ----- //
router.get("/getkapalById/:id", async (req, res) => {
  try {
    const kapalId = req.params.id;
    const kapal = await getKapalById(kapalId);

    res.send(kapal);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

// ----- # Create boat # ----- //
router.post("/createboat", async (req, res) => {
  try {
    const newkapalData = req.body;
    const kapal = await createKapal(newkapalData);

    res.send({
      data: kapal,
      message: "kapal created successfully",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// ----- # Update boat # ----- //
router.put("/updateboat", async (req, res) => {
  try {
    const kapalData = req.body;
    const { id } = kapalData;
    if (
      !(
        id &&
        kapalData.namaKapal &&
        kapalData.jenisKapal &&
        kapalData.panjangKapal &&
        kapalData.kapasitasPenumpang &&
        kapalData.kapalAktif &&
        kapalData.dermaga
      )
    ) {
      res.status(400).send("Missing parameters");
    }

    const kapal = await updateKapalById(id, kapalData);

    res.send({
      data: kapal,
      message: "kapal updated successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

// ----- # Delet boat by Id# ----- //
router.delete("/deleteboat/:id", async (req, res) => {
  try {
    const kapalId = req.params.id;

    await deleteKapalById(kapalId);

    res.send({
      data: kapal,
      message: "kapal deleted successfully",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
