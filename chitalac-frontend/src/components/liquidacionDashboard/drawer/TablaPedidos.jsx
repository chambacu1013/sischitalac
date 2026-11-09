import TablaBase from "../../common/TablaBase";

import "../../../estilos/tablaPedidos.css";
function TablaPedidos({
  pedidos = [],

  columns = [],

  loading = false,
}) {
  return (
    <div className="tabla-pedidos">
      <TablaBase
        rows={pedidos}
        columns={columns}
        loading={loading}
        getRowId={(row) => row.ped_id}
        autoHeight
        initialState={{
          sorting: {
            sortModel: [
              {
                field: "ped_dia",
                sort: "asc",
              },
            ],
          },
        }}
      />
    </div>
  );
}

export default TablaPedidos;
