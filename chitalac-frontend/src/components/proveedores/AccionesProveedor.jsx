import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function AccionesProveedor({
  proveedor,

  onEditar,

  onEliminar,
}) {
  return (
    <>
      <Tooltip title="Editar proveedor">
        <IconButton
          color="primary"
          size="small"
          onClick={() => onEditar(proveedor)}
        >
          <EditOutlinedIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Eliminar proveedor">
        <IconButton
          color="error"
          size="small"
          onClick={() => onEliminar(proveedor.prov_id)}
        >
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}
