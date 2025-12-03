const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

//Signup Routes
router.route("/signup")
.get(wrapAsync(userController.renderSignupForm))
.post(wrapAsync(userController.signup));

//Login Routes
router.route("/login")
.get(wrapAsync(userController.renderLoginForm))
.post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), wrapAsync(userController.login));

//LogOut
router.get("/logout", userController.logout);

module.exports = router;