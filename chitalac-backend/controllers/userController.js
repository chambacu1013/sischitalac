const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs"); // Ahora sí funcionará perfecto
const getUsers = async (req, res) => {
  try {
    if (req.usuario?.rol !== "ADMINISTRADOR") {
      return res
        .status(403)
        .json({ error: "Acceso restringido al administrador" });
    }
    const users = await userModel.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error al listar usuarios" });
  }
};

const createUser = async (req, res) => {
  try {
    const { nombre, apellido, cedula, username, password, rol_id } = req.body;
    if (!nombre || !apellido || !cedula || !username || !password || !rol_id) {
      return res
        .status(400)
        .json({ error: "Todos los campos obligatorios deben estar completos" });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      nombre,
      apellido,
      cedula,
      username,
      password_hash,
      rol_id,
    });

    return res.status(201).json({
      mensaje: "Usuario creado correctamente",
      id: newUser.usu_id,
    });
  } catch (err) {
    console.error("Error al crear usuario:", err);

    // Violación de restricción UNIQUE de PostgreSQL
    if (err.code === "23505") {
      return res.status(409).json({
        error: "Usuario ya existe",
      });
    }

    return res.status(500).json({
      error: "Error interno al crear usuario",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Extraemos tal cual los nombres que vienen de React (payloadBackend)
    const { nombre, apellido, cedula, username, password, rol_id } = req.body;

    // 2. Preparamos el objeto limpio para el modelo
    const dataToUpdate = {
      nombre,
      apellido,
      cedula,
      username, // Mantenemos el nombre 'username'
      rol_id,
    };

    // 3. ENCRIPTAMOS LA CONTRASEÑA SOLO SI EL ADMINISTRADOR ESCRIBIÓ UNA NUEVA
    if (password) {
      const salt = await bcrypt.genSalt(10);
      dataToUpdate.password_hash = await bcrypt.hash(password, salt);
    }

    // 4. Mandamos el objeto listo al modelo
    const updatedUser = await userModel.update(id, dataToUpdate);
    res.json({ mensaje: "Usuario actualizado", usuario: updatedUser });
  } catch (err) {
    console.error("Error real en el backend:", err); // Esto te ayudará a ver qué falla exactamente en la terminal
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Buscamos el usuario en la base de datos para verificar su rol
    const usuarioABorrar = await userModel.findById(id);

    if (!usuarioABorrar) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // 2. REGLA DE SEGURIDAD CRÍTICA: Impedir la desactivación del rol ADMINISTRADOR (rol_id = 1)
    if (parseInt(usuarioABorrar.rol_id) === 1) {
      return res.status(400).json({
        error:
          "Seguridad Chitalac: No es posible eliminar o desactivar a un usuario con el rol de ADMINISTRADOR.",
      });
    }

    // 3. Si supera la validación (es operario o asesor), procedemos al borrado lógico
    await userModel.inactivate(id);
    res.json({ mensaje: "Usuario desactivado correctamente en el sistema" });
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    res.status(500).json({
      error: "Error interno en el servidor al intentar eliminar el usuario",
    });
  }
};
module.exports = { getUsers, createUser, updateUser, deleteUser };
