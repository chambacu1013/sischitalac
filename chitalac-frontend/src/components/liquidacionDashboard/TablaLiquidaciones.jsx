import { DataGrid } from "@mui/x-data-grid";
import TableViewIcon from "@mui/icons-material/TableView";

import CardSeccion from "../common/CardSeccion";
import liquidacionDashboardColumns from "../../utils/liquidacionDashboardColumns";

const TablaLiquidaciones = ({ liquidaciones, cargarDetalle, loading }) => {
  return (
    <CardSeccion
      titulo="Liquidaciones del período"
      subtitulo="Listado de proveedores liquidados"
      icono={<TableViewIcon />}
    >
      <DataGrid
        rows={liquidaciones}
        columns={liquidacionDashboardColumns(cargarDetalle)}
        loading={loading}
        getRowId={(row) => row.quin_id}
        autoHeight
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 10,
            },
          },
        }}
        localeText={{
          noRowsLabel: "No existen liquidaciones para este período.",
        }}
      />
    </CardSeccion>
  );
};

export default TablaLiquidaciones;
