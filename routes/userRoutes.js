const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  verificarToken,
  verificarRol,
} = require("../middlewares/authMiddleware");

// Solo usuarios logueados pueden ver la lista
router.get("/", verificarToken, userController.getUsers);

// Solo el rol 'ADMINISTRADOR' puede crear usuarios
router.post(
  "/",
  verificarToken,
  verificarRol(["ADMINISTRADOR"]),
  userController.createUser,
);
router.put(
  "/:id",
  verificarToken,
  verificarRol(["ADMINISTRADOR"]),
  userController.updateUser,
);
router.delete(
  "/:id",
  verificarToken,
  verificarRol(["ADMINISTRADOR"]),
  userController.deleteUser,
);
module.exports = router;
