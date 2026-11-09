import React from "react";
import "../../estilos/tablaProveedoresReporte.css";

import { DataGrid } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";

import { reporteFinancieroColumns } from "../../utils/reporteFinancieroColumns";

const TablaProveedores = ({
  proveedores = [],
  criticos = [],
  onCancelar,
  cancelando = false,
}) => {
  const [tab, setTab] = React.useState("todos");

  const rows = tab === "criticos" ? criticos : proveedores;

  const columns = reporteFinancieroColumns({
    onCancelar,
    cancelando,
  });

  return (
    <div className="tabla-proveedores-container">
      {/* =====================================================
          PESTAÑAS
      ===================================================== */}

      <div className="tabla-proveedores-tabs">
        <button
          type="button"
          className={`tabla-proveedores-tab ${tab === "todos" ? "activa" : ""}`}
          onClick={() => setTab("todos")}
        >
          Todos los proveedores
        </button>

        <button
          type="button"
          className={`tabla-proveedores-tab ${
            tab === "criticos" ? "activa" : ""
          }`}
          onClick={() => setTab("criticos")}
        >
          Saldos críticos ({criticos.length})
        </button>
      </div>

      {/* =====================================================
          DATA GRID
      ===================================================== */}

      <div className="tabla-proveedores-grid">
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.prov_id}
          loading={false}
          autoHeight
          disableRowSelectionOnClick
          pageSizeOptions={[10, 20, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: {
                page: 0,
                pageSize: 10,
              },
            },
          }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          sx={{
            backgroundColor: "#fff",
            border: "none",
            borderRadius: 2,
            boxShadow: "none",

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#F5F7FB",
              fontWeight: 700,
            },

            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 700,
            },

            "& .MuiDataGrid-cell": {
              fontSize: 13,
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#F8FAFD",
            },

            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #E5E7EB",
            },
          }}
        />
      </div>
    </div>
  );
};

export default TablaProveedores;
