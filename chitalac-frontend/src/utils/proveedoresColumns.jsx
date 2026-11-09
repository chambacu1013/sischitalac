import AccionesProveedor from "../components/proveedores/AccionesProveedor";

export const proveedoresColumns = (onEditar, onEliminar) => [
  {
    field: "nombreCompleto",
    headerName: "Proveedor",
    flex: 2,
    sortable: true,
    valueGetter: (_, row) => `${row.prov_nom ?? ""} ${row.prov_ape ?? ""}`,
  },

  {
    field: "prov_cedula",
    headerName: "Cédula",
    width: 140,
  },

  {
    field: "prov_finca",
    headerName: "Finca",
    flex: 1.3,
  },

  {
    field: "prov_vereda",
    headerName: "Vereda",
    flex: 1.2,
  },

  {
    field: "prov_tel",
    headerName: "Teléfono",
    width: 150,
  },

  {
    field: "acciones",
    headerName: "Acciones",
    width: 120,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,

    renderCell: (params) => (
      <AccionesProveedor
        proveedor={params.row}
        onEditar={onEditar}
        onEliminar={onEliminar}
      />
    ),
  },
];
