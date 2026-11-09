import { Button, TextField } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import "../../estilos/toolbarProveedores.css";

export default function ToolbarProveedores({
  onNuevo,

  filtro,

  onFiltroChange,
}) {
  return (
    <div className="toolbar-proveedores">
      <div className="toolbar-info">
        <h1>Gestión de Proveedores</h1>

        <p>Administre los proveedores registrados en el sistema.</p>
      </div>

      <div className="toolbar-acciones">
        <TextField
          size="small"
          placeholder="Buscar proveedor..."
          value={filtro}
          onChange={(e) => onFiltroChange(e.target.value)}
        />

        <Button variant="contained" startIcon={<AddIcon />} onClick={onNuevo}>
          Nuevo Proveedor
        </Button>
      </div>
    </div>
  );
}
