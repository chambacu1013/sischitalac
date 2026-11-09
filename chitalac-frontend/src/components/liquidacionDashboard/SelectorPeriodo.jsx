import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { formatearFecha } from "../../utils/formatters";

const SelectorPeriodo = ({
  periodos,
  periodoSeleccionado,
  setPeriodoSeleccionado,
}) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel>Período</InputLabel>

      <Select
        value={periodoSeleccionado}
        label="Período"
        onChange={(e) => setPeriodoSeleccionado(e.target.value)}
      >
        {periodos.map((periodo) => (
          <MenuItem key={periodo.periodo_id} value={periodo.periodo_id}>
            {`${formatearFecha(periodo.quin_fecha_inicio)} - ${formatearFecha(periodo.quin_fecha_fin)}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectorPeriodo;
