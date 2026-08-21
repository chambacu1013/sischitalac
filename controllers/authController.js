const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// 1. IMPORTAS EL MODELO
const userModel = require("../models/userModel");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 2. USAS EL MODELO (Es mucho más legible)
    const usuarioBD = await userModel.findUserByUsername(username);

    // Si no existe, usuarioBD será undefined
    if (!usuarioBD) {
      return res
        .status(401)
        .json({ error: "Usuario no encontrado o inactivo" });
    }

    // 3. El resto de tu lógica sigue igual
    const validPassword = await bcrypt.compare(
      password,
      usuarioBD.usu_password_hash,
    );

    if (!validPassword) {
      return res.status(401).json({
        error: "Contraseña incorrecta",
      });
    }

    const token = jwt.sign(
      {
        usu_id: usuarioBD.usu_id,
        usu_nombre: usuarioBD.usu_nombre,
        usu_apellido: usuarioBD.usu_apellido,
        rol: usuarioBD.rol_nombre,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      },
    );

    res.json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        usu_id: usuarioBD.usu_id,
        usu_nombre: usuarioBD.usu_nombre,
        usu_apellido: usuarioBD.usu_apellido,
        usu_cedula: usuarioBD.usu_cedula,
        usu_username: usuarioBD.usu_username,
        rol_id: usuarioBD.rol_id,
        rol_nombre: usuarioBD.rol_nombre,
      },
    });
  } catch (error) {
    console.error("Error en Login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = { login };
