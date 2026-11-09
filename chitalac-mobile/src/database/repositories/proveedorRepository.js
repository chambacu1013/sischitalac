import db from "../database";

export function guardarCatalogo(proveedores) {
  for (const proveedor of proveedores) {
    db.runSync(
      `
      INSERT OR REPLACE INTO proveedores (
        prov_id,
        prov_nom,
        prov_ape,
        prov_cedula,
        prov_finca,
        prov_vereda,
        prov_tel
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        proveedor.prov_id,
        proveedor.prov_nom,
        proveedor.prov_ape,
        proveedor.prov_cedula,
        proveedor.prov_finca,
        proveedor.prov_vereda,
        proveedor.prov_tel,
      ],
    );
  }
}
export function vaciarTabla() {
  db.runSync("DELETE FROM proveedores");
}
export function obtenerProveedores() {
  return db.getAllSync(`
      SELECT *
      FROM proveedores
      ORDER BY prov_nom
  `);
}
const proveedorRepository = {
  guardarCatalogo,
  vaciarTabla,
  obtenerProveedores,
};

export default proveedorRepository;
