import TablaBase from "../common/TablaBase";

import "../../estilos/tablaUsuarios.css";

export default function TablaUsuarios({ usuarios, columns, loading = false }) {
  return (
    <div className="tabla-usuarios">
      <TablaBase
        rows={usuarios}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.usu_id}
        autoHeight
      />
    </div>
  );
}
