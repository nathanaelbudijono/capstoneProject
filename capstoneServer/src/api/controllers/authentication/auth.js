// ----- # API Route http://localhost:8080/api/authentication/~ # ----- //

const express = require("express");
const router = express.Router();
const prisma = require("../../../configs/connection");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

const app = express();
app.use(cookieParser());

// ----- # Login role user # ----- //
router.post("/roleuser", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userDoc = await prisma.users.findUnique({
      where: {
        email: email,
        role: "user",
      },
    });
    if (!userDoc) {
      return res.status(404).json({ message: "User not found" });
    }
    const decodedPassword = bcrypt.compareSync(password, userDoc.password);
    if (decodedPassword) {
      jwt.sign(
        {
          email,
          id: userDoc.id,
          firstsName: userDoc.firstName,
          lastName: userDoc.lastName,
          role: userDoc.role,
        },
        process.env.TOKEN_SECRET,
        {},
        (err, token) => {
          res.cookie("token", token);
          res.send("cookie set");
        }
      );
    } else {
      res.status(404).json({ message: "Wrong Password/Username!" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/rolecompany", async (req, res) => {
  try {
    const { email, password } = req.body;

    const isCompany = await prisma.company.findUnique({
      where: {
        email: email,
        role: "company",
      },
    });
    if (!isCompany) {
      return res.status(404).json({ message: "Invalid username/password" });
    }
    const decodedPassword = bcrypt.compareSync(password, isCompany.password);
    if (decodedPassword) {
      jwt.sign(
        {
          id: isCompany.id,
          email: isCompany.email,
          companyId: isCompany.companyId,
          role: isCompany.role,
        },
        process.env.TOKEN_SECRET,
        {},
        (err, token) => {
          res.cookie("token", token);
          res.send("cookie set");
        }
      );
    } else {
      res.status(404).json({ message: "Wrong Password/Username!" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/logout", async (req, res) => {
  try {
    res.cookie("token", "").json({ message: "logout  success" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
