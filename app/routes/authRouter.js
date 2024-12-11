const express = require("express")
const router = express.Router()
const authController = require("../controller/auth/authController")
const authenticateToken = require('../middleware/authMiddleWare'); // Ensure this path is correct

router.post("/register", authController.register);
router.get('/register/:id', authenticateToken, authController.getRegisterById);
router.post("/login", authController.login);

module.exports = router;