import { Grid, Typography, Box } from "@mui/material";

import AssessmentIcon from "@mui/icons-material/Assessment";

import CardSeccion from "../common/CardSeccion";

const ResumenPeriodo = ({ resumen }) => {
  if (!resumen) return null;

  const indicadores = [
    {
      titulo: "Total Litros",
      valor: Number(resumen.total_litros).toLocaleString("es-CO"),
    },
    {
      titulo: "Valor Leche",
      valor: `$ ${Number(resumen.precio_total_leche).toLocaleString("es-CO")}`,
    },
    {
      titulo: "Descuentos",
      valor: `$ ${Number(resumen.total_descuento_pedidos).toLocaleString("es-CO")}`,
    },
    {
      titulo: "Saldo Pendiente",
      valor: `$ ${Number(resumen.saldo_pendiente_antiguo).toLocaleString("es-CO")}`,
    },
    {
      titulo: "Saldo Neto",
      valor: `$ ${Number(resumen.saldo_neto_final).toLocaleString("es-CO")}`,
    },
  ];
  return (
    <CardSeccion
      titulo="Resumen del período"
      subtitulo="Indicadores contables"
      icono={<AssessmentIcon />}
    >
      <Grid container spacing={2}>
        {indicadores.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.titulo}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {item.titulo}
              </Typography>

              <Typography variant="h6" fontWeight="bold">
                {item.valor}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </CardSeccion>
  );
};

export default ResumenPeriodo;
