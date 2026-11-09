import {
  Box,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";

const TablaLeche = ({
  leches = [],
  liquidacionAbierta,
  onAgregar,
  onEditar,
}) => {
  const columns = [
    {
      field: "lec_dia",
      headerName: "Día",
      width: 60,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "lec_litros",
      headerName: "Litros",
      minWidth: 100,
      align: "right",
      headerAlign: "right",
      valueFormatter: (value) =>
        `${Number(value ?? 0).toLocaleString("es-CO")} Lt`,
    },
    {
      field: "lec_prueba_alcohol",
      headerName: "Calidad",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Chip
          label={params.row.lec_prueba_alcohol ? "Aprobada" : "Rechazada"}
          color={params.row.lec_prueba_alcohol ? "success" : "error"}
          size="small"
          variant="outlined"
        />
      ),
    },
  ];

  // Solo agregamos la columna de acciones
  // cuando la liquidación está ABIERTA.
  if (liquidacionAbierta) {
    columns.push({
      field: "acciones",
      headerName: "Acciones",
      width: 90,
      sortable: false,
      filterable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Tooltip title="Editar registro">
          <IconButton
            color="primary"
            size="small"
            onClick={() => onEditar(params.row)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    });
  }

  return (
    <Box>
      {/* Cabecera */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <LocalDrinkIcon color="primary" />

          <Box>
            <Typography variant="h6" fontWeight="bold">
              Registro de leche
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {leches.length} registros de acopio
            </Typography>
          </Box>
        </Box>

        {liquidacionAbierta && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAgregar}
            size="small"
          >
            Agregar
          </Button>
        )}
      </Box>

      {/* Tabla */}
      <DataGrid
        rows={leches}
        columns={columns}
        getRowId={(row) => row.lec_id}
        autoHeight
        disableRowSelectionOnClick
        hideFooter={leches.length <= 5}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 5,
            },
          },
        }}
        localeText={{
          noRowsLabel: "No hay registros de leche.",
        }}
        sx={{
          border: 1,
          borderColor: "divider",
        }}
      />
    </Box>
  );
};

export default TablaLeche;
