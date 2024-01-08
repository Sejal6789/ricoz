const express = require("express");
const { registerUser, loginUser, logoutUser, getUserdetails, updatePassword, updateProfile, deleteuser } = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(isAuthenticatedUser, logoutUser);
router.route("/me").get(isAuthenticatedUser, getUserdetails);
router.route("/update/profile").put(isAuthenticatedUser, updateProfile);
router.route("/update/password").put(isAuthenticatedUser, updatePassword);
router.route("/delete").delete(isAuthenticatedUser, deleteuser);

module.exports = router;