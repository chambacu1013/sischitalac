const jwt = require("jsonwebtoken");

// 1. Guardia 1: Verifica si la persona trae su Token (Carné)
const verificarToken = (req, res, next) => {
  // El token suele venir en los Headers como: "Bearer eyJhbGci..."
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(403)
      .json({ error: "Acceso denegado. No se proporcionó un token." });
  }

  try {
    // Extraemos solo el token, ignorando la palabra "Bearer"
    const token = authHeader.split(" ")[1];

    // Verificamos si es válido con nuestro secreto
    const decodificado = jwt.verify(token, process.env.JWT_SECRET);

    // Guardamos los datos del usuario en la petición para usarlos en el siguiente paso
    req.usuario = decodificado;

    next(); // Todo está bien, lo dejamos pasar al controlador
  } catch (error) {
    return res
      .status(401)
      .json({
        error:
          "Token inválido o expirado. Por favor, inicie sesión nuevamente.",
      });
  }
};

// 2. Guardia 2: Verifica si el Carné tiene el Rol correcto para esa puerta
const verificarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    // Comprobamos si el rol del usuario está dentro de los permitidos para esa ruta
    if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({
        error: `Acceso restringido. Requiere uno de los siguientes roles: ${rolesPermitidos.join(", ")}`,
      });
    }
    next(); // Tiene el rol, lo dejamos pasar
  };
};

module.exports = { verificarToken, verificarRol };
