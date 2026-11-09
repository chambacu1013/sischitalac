import { Card, CardContent, Typography, Box } from "@mui/material";

import "../../estilos/cardSeccion.css";

function CardSeccion({
  titulo,

  subtitulo,

  icono,

  children,
}) {
  return (
    <Card elevation={2} className="card-seccion">
      <CardContent>
        <Box className="card-seccion-header">
          <Box className="card-seccion-icono">{icono}</Box>

          <Box>
            <Typography variant="h6" className="card-seccion-titulo">
              {titulo}
            </Typography>

            {subtitulo && (
              <Typography variant="body2" color="text.secondary">
                {subtitulo}
              </Typography>
            )}
          </Box>
        </Box>

        <Box className="card-seccion-body">{children}</Box>
      </CardContent>
    </Card>
  );
}

export default CardSeccion;
