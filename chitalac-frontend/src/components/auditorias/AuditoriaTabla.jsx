import React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";

import { auditoriaColumns } from "../../utils/auditoriaColumns";

export default function AuditoriaTabla({ rows, loading }) {
  return (
    <DataGrid
      rows={rows}
      columns={auditoriaColumns}
      getRowId={(row) => row.aud_id}
      loading={loading}
      autoHeight
      disableRowSelectionOnClick
      pageSizeOptions={[10, 20, 50, 100]}
      initialState={{
        pagination: {
          paginationModel: {
            page: 0,
            pageSize: 20,
          },
        },
      }}
      localeText={esES.components.MuiDataGrid.defaultProps.localeText}
      sx={{
        backgroundColor: "#fff",
        borderRadius: 2,
        border: "none",
        boxShadow: 1,

        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#F5F7FB",
          fontWeight: 700,
        },

        "& .MuiDataGrid-cell": {
          fontSize: 13,
        },

        "& .MuiDataGrid-row:hover": {
          backgroundColor: "#F8FAFD",
        },
      }}
    />
  );
}
