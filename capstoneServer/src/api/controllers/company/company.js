// ----- # API Route http://localhost:8080/api/company/~ # ----- //

const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const prisma = require("../../../configs/connection");
const bodyParser = require("body-parser");

const app = express();
app.use(cookieParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { createCompany } = require("../../services/company/company.js");

router.get("/getcompanybyid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const company = await prisma.company.findUnique({ where: { id: id } });
    res.json(company);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// ----- # Create Company  # ----- //
router.post("/createcompany", async (req, res) => {
  try {
    const companyData = req.body;
    const findUniqueEmail = await prisma.company.findUnique({
      where: {
        email: companyData.email,
      },
    });
    const findUniqueID = await prisma.company.findUnique({
      where: {
        companyId: companyData.companyID,
      },
    });
    if (findUniqueEmail) {
      return res.status(400).send({ message: "Email already exist" });
    }
    if (findUniqueID) {
      return res.status(400).send({ message: "Company ID already exist" });
    }
    const createdCompanyData = await createCompany(companyData);
    res.send({
      data: createdCompanyData,
      message: "Company created succesfully!",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
