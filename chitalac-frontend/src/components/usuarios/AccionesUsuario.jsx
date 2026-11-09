import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import LockPersonOutlinedIcon from "@mui/icons-material/LockPersonOutlined";

export default function AccionesUsuario({ usuario, onEditar, onEliminar }) {
  const esAdministrador = parseInt(usuario.rol_id) === 1;

  return (
    <>
      <Tooltip title="Editar usuario">
        <IconButton
          color="primary"
          size="small"
          onClick={() => onEditar(usuario)}
        >
          <EditOutlinedIcon />
        </IconButton>
      </Tooltip>

      {esAdministrador ? (
        <Tooltip title="Administrador protegido">
          <span>
            <IconButton disabled color="default" size="small">
              <LockPersonOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>
      ) : (
        <Tooltip title="Eliminar usuario">
          <IconButton
            color="error"
            size="small"
            onClick={() =>
              onEliminar(usuario.usu_id, usuario.usu_nombre, usuario.rol_id)
            }
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
}
