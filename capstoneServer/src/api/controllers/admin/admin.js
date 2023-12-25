// ----- # API Route http://localhost:8080/api/admin/~ # ----- //

const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser);

const {
  createAdmin,
  updateAdminById,
  getAdminById,
} = require("../../services/admin/admin.js");

// ----- # Create admin  # ----- //
router.post("/createAdmin", async (req, res) => {
  try {
    const newAdminData = req.body;
    const admin = await createAdmin(newAdminData);
    res.send({
      data: admin,
      message: "admin created successfully",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// ----- # Get admin By Id # ----- //
router.get("/getAdminById", async (req, res) => {
  try {
    const { id } = req.body;
    const admin = await getAdminById(id);
    res.send({
      data: admin,
      message: "admin get successfully",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// ----- # Update admin By Id # ----- //
router.put("/updateAdmin", async (req, res) => {
  try {
    const adminData = req.body;
    const { id } = adminData;
    if (
      !(
        id &&
        adminData.firstName &&
        adminData.lastName &&
        adminData.city &&
        adminData.country
      )
    ) {
      res.status(400).send("Missing parameters");
    }

    const admin = await updateAdminById(id, adminData);

    res.send({
      data: admin,
      message: "admin updated successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
