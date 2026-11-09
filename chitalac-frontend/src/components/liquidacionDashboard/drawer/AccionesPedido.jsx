import { IconButton, Stack, Tooltip } from "@mui/material";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function AccionesPedido({
  pedido,

  estadoLiquidacion = "ABIERTA",

  onEditar,

  onEliminar,
}) {
  const bloqueado = estadoLiquidacion === "LIQUIDADA";

  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      <Tooltip
        title={bloqueado ? "La liquidación está cerrada" : "Editar pedido"}
      >
        <span>
          <IconButton
            color="primary"
            size="small"
            disabled={bloqueado}
            onClick={() => onEditar(pedido)}
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip
        title={bloqueado ? "La liquidación está cerrada" : "Eliminar pedido"}
      >
        <span>
          <IconButton
            color="error"
            size="small"
            disabled={bloqueado}
            onClick={() => onEliminar(pedido)}
          >
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    </Stack>
  );
}

export default AccionesPedido;
