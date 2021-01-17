const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
// Import our User schema
const User = require("../../models/User.js");
const withAuth = require("../../middleware");

const secret = "mysecrettoken";

// POST route to register a user
router.post("/register", function (req, res) {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function (err) {
    if (err) {
      res.status(500).send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

router.post("/authenticate", function (req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function (err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again",
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect email or password",
      });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again",
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect email or password",
          });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: 86400,
          });
          res.status(200).send({
            id: user._id,
            email: user.email,
            accessToken: token,
          });
        }
      });
    }
  });
});

router.get("/checkToken", withAuth, function (req, res) {
  res.sendStatus(200);
});

module.exports = router;
