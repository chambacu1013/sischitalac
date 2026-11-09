import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EstadoRol from "../components/usuarios/EstadoRol";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AccionesUsuario from "../components/usuarios/AccionesUsuario";
export const usuariosColumns = (onEditar, onEliminar) => [
  {
    field: "nombreCompleto",
    headerName: "Nombre Completo",
    flex: 2,
    valueGetter: (_, row) =>
      `${row.usu_nombre ?? ""} ${row.usu_apellido ?? ""}`,
  },

  {
    field: "usu_cedula",
    headerName: "Cédula",
    width: 150,
  },

  {
    field: "usu_username",
    headerName: "Usuario",
    width: 180,
  },

  {
    field: "rol_nombre",
    headerName: "Rol",
    width: 170,

    renderCell: (params) => <EstadoRol rol={params.value} />,
  },

  {
    field: "acciones",
    headerName: "Acciones",
    width: 120,
    sortable: false,
    filterable: false,

    renderCell: (params) => (
      <AccionesUsuario
        usuario={params.row}
        onEditar={onEditar}
        onEliminar={onEliminar}
      />
    ),
  },
];
