const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Ruta: POST http://localhost:3000/api/auth/login
router.post("/login", authController.login);
//console.log("Llegó petición de login");
module.exports = router;
