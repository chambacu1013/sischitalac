import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { formatearQuincena } from "../../utils/formatters";
function SelectorQuincena({
  quincenas = [],

  quincenaSeleccionada,

  onSeleccionarQuincena,
}) {
  return (
    <Box
      sx={{
        mb: 3,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <CalendarMonthIcon color="primary" fontSize="large" />

        <Typography variant="h6" fontWeight={700}>
          Quincena de Trabajo
        </Typography>

        <FormControl
          size="small"
          sx={{
            minWidth: 320,
          }}
        >
          <InputLabel>Seleccione una quincena</InputLabel>

          <Select
            value={quincenaSeleccionada}
            label="Seleccione una quincena"
            onChange={(e) => onSeleccionarQuincena(e.target.value)}
          >
            {quincenas.map((q) => (
              <MenuItem key={q.quin_id} value={q.quin_id}>
                {formatearQuincena(q.quin_fecha_inicio, q.quin_fecha_fin)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
}

export default SelectorQuincena;
