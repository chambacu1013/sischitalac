import {
  Avatar,
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
  Divider,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import { formatearMoneda, formatearFecha } from "../../utils/formatters";
function CabeceraProveedor({
  proveedor,
  liquidacion,
  totalPedidos,
  totalDescuentos,
}) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
        mb: 3,
      }}
    >
      <Stack direction="row" alignItems="center">
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            flex: 1,
          }}
        >
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: "#E8F0FE",
              color: "#0D47A1",
            }}
          >
            <PersonIcon />
          </Avatar>

          <Box>
            <Typography variant="h5" fontWeight={700}>
              {proveedor.prov_nom} {proveedor.prov_ape}
            </Typography>

            <Typography color="text.secondary">
              C.C. {proveedor.prov_cedula}
            </Typography>

            <Typography color="text.secondary">
              {proveedor.prov_vereda} · {proveedor.prov_finca}
            </Typography>
          </Box>
        </Stack>

        <Stack spacing={1} alignItems="flex-end">
          <Chip
            label={
              liquidacion.estado_contable === "ABIERTA"
                ? "Liquidación Abierta"
                : "Liquidación Cerrada"
            }
            color={
              liquidacion.estado_contable === "ABIERTA" ? "success" : "error"
            }
            variant="outlined"
            sx={{
              fontWeight: 600,
              minWidth: 180,
            }}
          />
        </Stack>
      </Stack>
      <Divider sx={{ my: 3 }} />
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        sx={{
          mt: 2,
          width: "100%",
        }}
      >
        <Box
          sx={{
            flex: 1,
            textAlign: "center",
            px: 1,
          }}
        >
          <Typography color="text.secondary">Pedidos</Typography>

          <Typography variant="h4" fontWeight="bold">
            {totalPedidos}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            textAlign: "center",
            px: 1,
          }}
        >
          <Typography color="text.secondary">Total Deducciones</Typography>

          <Typography variant="h5" color="error.main" fontWeight="bold">
            {formatearMoneda(totalDescuentos)}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            textAlign: "center",
            px: 1,
          }}
        >
          <Typography color="text.secondary">Estado</Typography>

          <Chip
            color={
              liquidacion.estado_contable === "ABIERTA" ? "success" : "error"
            }
            label={liquidacion.estado_contable}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            textAlign: "center",
            px: 1,
          }}
        >
          <Typography color="text.secondary">Quincena</Typography>

          <Typography fontWeight="bold">
            {formatearFecha(liquidacion.quin_fecha_inicio)} -{" "}
            {formatearFecha(liquidacion.quin_fecha_fin)}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

export default CabeceraProveedor;
