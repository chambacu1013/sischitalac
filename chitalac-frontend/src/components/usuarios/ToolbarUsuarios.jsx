import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import "../../estilos/toolbarUsuarios.css";

export default function ToolbarUsuarios({ onNuevo, filtro, onFiltroChange }) {
  return (
    <div className="toolbar-usuarios">
      <div className="toolbar-info">
        <h1>Gestión de Usuarios</h1>

        <p>Administre los usuarios y los roles de acceso del sistema.</p>
      </div>

      <div className="toolbar-acciones">
        <TextField
          size="small"
          placeholder="Buscar usuario..."
          value={filtro}
          onChange={(e) => onFiltroChange(e.target.value)}
        />

        <Button variant="contained" startIcon={<AddIcon />} onClick={onNuevo}>
          Nuevo Usuario
        </Button>
      </div>
    </div>
  );
}
