import { Button, Box, Stack, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

function ToolbarPedidos({
  totalPedidos = 0,

  onNuevoPedido,

  estadoLiquidacion = "ABIERTA",

  mostrarBoton = true,

  textoBoton = "Agregar Nuevo Pedido",
}) {
  const bloqueado = estadoLiquidacion === "LIQUIDADA";

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        sx={{
          flex: 1,
        }}
      >
        <Typography variant="body1" color="text.secondary">
          {totalPedidos} pedido{totalPedidos !== 1 ? "s" : ""} registrado
          {totalPedidos !== 1 ? "s" : ""} en esta quincena
        </Typography>
      </Box>
      {mostrarBoton && (
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={onNuevoPedido}
          disabled={bloqueado}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: 3,
            py: 1,
            fontWeight: 600,
          }}
        >
          {textoBoton}
        </Button>
      )}
    </Stack>
  );
}

export default ToolbarPedidos;
