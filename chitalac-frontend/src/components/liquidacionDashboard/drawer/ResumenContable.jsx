import { Box, Divider, Stack, Typography } from "@mui/material";

import { formatearLitros, formatearMoneda } from "../../../utils/formatters";

function ResumenContable({ liquidacion }) {
  if (!liquidacion) return null;

  const Item = ({
    label,
    value,
    color = "text.primary",
    bold = false,
    variant = "body2",
  }) => (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        py: 0.8,
        borderBottom: "1px dashed",
        borderColor: "divider",
      }}
    >
      <Typography
        variant={variant}
        color="text.secondary"
        sx={{
          minWidth: 180,
        }}
      >
        {label}
      </Typography>

      <Typography
        variant={variant}
        fontWeight={bold ? 700 : 600}
        color={color}
        sx={{
          textAlign: "right",
          flex: 1,
        }}
      >
        {value}
      </Typography>
    </Stack>
  );

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        p: 2,
        mt: 3,
      }}
    >
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        Resumen Contable
      </Typography>

      <Item
        label="Total litros"
        value={formatearLitros(liquidacion.total_litros)}
      />

      <Item
        label="Precio por litro"
        value={formatearMoneda(liquidacion.precio_unitario_litro)}
      />

      <Item
        label="Valor bruto leche"
        value={formatearMoneda(liquidacion.precio_total_leche)}
        color="primary.main"
      />

      <Item
        label="Total pedidos"
        value={formatearMoneda(liquidacion.total_descuento_pedidos)}
        color="error.main"
      />

      <Item
        label="Saldo pendiente anterior"
        value={formatearMoneda(liquidacion.saldo_pendiente_antiguo)}
        color="warning.main"
      />

      <Divider sx={{ my: 2 }} />

      <Divider sx={{ my: 2 }} />

      <Item
        label="Neto a pagar"
        value={formatearMoneda(liquidacion.saldo_neto_final)}
        color={
          liquidacion.saldo_neto_final >= 0 ? "success.main" : "error.main"
        }
        bold
        variant="h6"
      />
    </Box>
  );
}

export default ResumenContable;
