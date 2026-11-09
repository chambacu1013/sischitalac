import { DataGrid } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import { CONFIG_TABLA } from "../../constants/liquidacion";
function TablaBase({
  rows,
  columns,
  loading = false,
  pageSize = CONFIG_TABLA.PAGE_SIZE,
  getRowId,
  height = 500,
  autoHeight = false,
}) {
  return (
    <div
      style={{
        height: autoHeight ? "auto" : height,
        width: "100%",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        getRowId={getRowId}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        pageSizeOptions={CONFIG_TABLA.PAGE_SIZE_OPTIONS}
        autoHeight={autoHeight}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: CONFIG_TABLA.PAGE_SIZE,
            },
          },
        }}
        disableRowSelectionOnClick
      />
    </div>
  );
}

export default TablaBase;
