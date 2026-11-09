import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const AccionesLiquidacion = ({ row, cargarDetalle }) => {
  return (
    <Tooltip title="Ver detalle">
      <IconButton color="primary" onClick={() => cargarDetalle(row.quin_id)}>
        <VisibilityIcon />
      </IconButton>
    </Tooltip>
  );
};

export default AccionesLiquidacion;
