const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const {
  validateUserLogin,
  validateUserRegistration
} = require("../../validation/user");
const router = express.Router();

// Load User Model
const User = require("../../models/User");

/**
 * @Route   POST {api/user/register}
 * @Desc    Register new user
 * @Access  Public
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
  }
);
/**
 * @Route   POST {api/user/register}
 * @Desc    Register new user
 * @Access  Public
 */
router.post("/register", (req, res) => {
  // Validate user registration data
  const { errors, isValid } = validateUserRegistration(req.body);
  if (!isValid) return res.status(400).json(errors);
  // Check the email if already registered
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "User already registered";
      res.status(400).json(errors);
    } else {
      // Getting avatar image from gravatar
      const avatar = gravatar.url(req.body.email, {
        s: 200, // Image size
        r: "pg", // Rating
        d: "mm" // Default
      });
      // Store new user data in a object
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar: avatar
      });
      // Hasing the password using bcryptjs
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => res.json(err));
        });
      });
    }
  });
});

/**
 * @Route   POST {api/user/login}
 * @Desc    Loging user
 * @Access  Public
 */
router.post("/login", (req, res) => {
  const { errors, isValid } = validateUserLogin(req.body);
  if (!isValid) return res.status(400).json(errors);

  // Get user input
  const email = req.body.email;
  const password = req.body.password;

  // Find user by Email
  User.findOne({ email: email }).then(user => {
    if (!user) return res.status(404).json({ email: "User Not Found!" });

    // Match Password
    bcrypt.compare(password, user.password).then(isMatch => {
      errors.password = "Wrong Password!";
      if (!isMatch) return res.status(400).json(errors);

      /* Supply JSON Web Token */
      const payload = { id: user.id, name: user.name, avatar: user.avatar };
      jwt.sign(payload, "secretKey", { expiresIn: 30 }, (err, token) => {
        res.json({ success: true, token: "Bearer " + token });
        console.log(err);
      });
    });
  });
});
module.exports = router;
