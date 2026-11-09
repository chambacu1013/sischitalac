import TablaBase from "../common/TablaBase";

import "../../estilos/tablaProveedores.css";

export default function TablaProveedores({
  proveedores,
  columns,
  loading = false,
}) {
  return (
    <div className="tabla-proveedores">
      <TablaBase
        rows={proveedores}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.prov_id}
        autoHeight
      />
    </div>
  );
}
