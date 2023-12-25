const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { config } = require("dotenv");
const morgan = require("morgan");

// ----- # Import controllers # ----- //
const userControllers = require("./api/controllers/user/user.js");
const authControllers = require("./api/controllers/authentication/auth.js");
const kapalControllers = require("./api/controllers/user/kapal.js");
const decodedControllers = require("./api/controllers/decoded/decoded.js");
const adminControllers = require("./api/controllers/admin/admin.js");
const companyControllers = require("./api/controllers/company/company.js");
const companyLayananControllers = require("./api/controllers/company/layanan.js");
const companybillingControllers = require("./api/controllers/company/billing.js");
const userbillingControllers = require("./api/controllers/user/billing.js");
const userpaymentControllers = require("./api/controllers/user/payment.js");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(morgan("tiny"));
config();

// ----- # Middleware for user role # ----- //
const verifyToken = (req, res, next) => {
  const token = req.headers.cookie.split("=")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token not provided" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, {}, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

// ----- # Middleware for admin role # ----- //
const verifyTokenCompany = (req, res, next) => {
  const token = req.headers.cookie.split("=")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token not provided" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, {}, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

// ----- # Import controllers # ----- //

// ----- # User routes # ----- //
app.use("/api/user", userControllers);
app.use("/api/admin", adminControllers);
app.use("/api/authentication/", authControllers);
app.use("/api/decoded/", decodedControllers);
app.use("/api/kapal/user", verifyToken, kapalControllers);
app.use("/api/company", companyControllers);
app.use("/api/layanan/company", verifyTokenCompany, companyLayananControllers);
app.use("/api/billing/company", verifyTokenCompany, companybillingControllers);
app.use("/api/userbilling/", verifyToken, userbillingControllers);
app.use("/api/userpayment/", verifyToken, userpaymentControllers);
// ----- # Company routes # ----- //

app.listen(PORT, () => console.log(`Running Express Server on Port ${PORT}!`));
