// ----- # API Route http://localhost:8080/api/decoded/~ # ----- //

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

// ----- # Login role user # ----- //
router.get("/getuserinfo", async (req, res) => {
  const cookie = req.headers.cookie.split("=")[1];
  if (cookie) {
    jwt.verify(cookie, process.env.TOKEN_SECRET, {}, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Token" });
      } else {
        res.send(decoded);
      }
    });
  } else {
    return res.status(401).json({ message: "No cookie was found" });
  }
});

router.get("/getcompanyinfo", async (req, res) => {
  const cookie = req.headers.cookie.split("=")[1];
  if (cookie) {
    jwt.verify(cookie, process.env.TOKEN_SECRET, {}, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Token" });
      } else {
        res.send(decoded);
      }
    });
  } else {
    return res.status(401).json({ message: "No cookie was found" });
  }
});

module.exports = router;
