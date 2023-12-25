// ----- # API Route http://localhost:8080/api/user/~ # ----- //

const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cookieParser);

const {
  createUser,
  updateUserById,
  getUserById,
} = require("../../services/user/user.js");

// ----- # Create User  # ----- //
router.post("/createuser", async (req, res) => {
  try {
    const newUserData = req.body;
    const user = await createUser(newUserData);
    res.send({
      data: user,
      message: "User created successfully",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// ----- # Get User By Id # ----- //
router.get("/getuserbyid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserById(id);
    res.send({
      data: user,
      message: "User get successfully",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
// ----- # Update User By Id # ----- //
router.put("/updateUser", async (req, res) => {
  try {
    const userData = req.body;
    const { id } = userData;
    if (
      !(
        id &&
        userData.firstName &&
        userData.lastName &&
        userData.city &&
        userData.country
      )
    ) {
      res.status(400).send("Missing parameters");
    }

    const user = await updateUserById(id, userData);

    res.send({
      data: user,
      message: "User updated successfully",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
