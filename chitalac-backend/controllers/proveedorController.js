const proveedorModel = require("../models/proveedorModel");

const getProveedores = async (req, res) => {
  try {
    const proveedores = await proveedorModel.findAll();
    res.json(proveedores);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener proveedores" });
  }
};

const createProveedor = async (req, res) => {
  try {
    await proveedorModel.create(req.body);
    res.status(201).json({ mensaje: "Proveedor registrado exitosamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al crear proveedor" });
  }
};
const deleteProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    // 1. Validar si tiene historial de quincenas (Seguridad Contable)
    const tieneHistorial = await proveedorModel.hasLiquidaciones(id);

    if (tieneHistorial) {
      return res.status(400).json({
        error:
          "No se puede eliminar: este proveedor ya tiene liquidaciones de quincena registradas.",
      });
    }

    // 2. Si pasa la validación, procedemos a desactivarlo
    await proveedorModel.inactivate(id);
    res.json({ mensaje: "Proveedor desactivado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al intentar eliminar el proveedor" });
  }
};
const updateProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    await proveedorModel.update(id, req.body);
    res.json({ mensaje: "Proveedor actualizado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar proveedor" });
  }
};
module.exports = {
  getProveedores,
  createProveedor,
  deleteProveedor,
  updateProveedor,
};
