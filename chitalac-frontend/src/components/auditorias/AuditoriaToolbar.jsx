import React from "react";
import { Box } from "@mui/material";
import FiltroFecha from "../common/FiltroFecha";
import FiltroSelect from "../common/FiltroSelect";
import BotonExportar from "../common/BotonExportar";

export default function AuditoriaToolbar({
  filtros,
  usuarios,
  proveedores,
  onChange,
  onExportar,
}) {
  return (
    <Box
      sx={{
        mb: 3,
        p: 2.5,
        bgcolor: "#fff",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 2,
        }}
      >
        <FiltroFecha
          label="Desde"
          name="fechaInicio"
          value={filtros.fechaInicio}
          onChange={onChange}
        />

        <FiltroFecha
          label="Hasta"
          name="fechaFin"
          value={filtros.fechaFin}
          onChange={onChange}
        />

        <FiltroSelect
          label="Usuario"
          name="usuario"
          value={filtros.usuario}
          onChange={onChange}
          options={usuarios}
          valueKey="usu_id"
          labelKey="usu_nombre"
        />

        <FiltroSelect
          label="Proveedor"
          name="proveedor"
          value={filtros.proveedor}
          onChange={onChange}
          options={proveedores}
          valueKey="prov_id"
          labelKey="prov_nombre"
        />

        <FiltroSelect
          label="Acción"
          name="accion"
          value={filtros.accion}
          onChange={onChange}
          options={[
            { id: "CREAR", nombre: "Crear" },
            { id: "ACTUALIZAR", nombre: "Actualizar" },
            { id: "SINCRONIZAR", nombre: "Sincronizar" },
            { id: "LOGIN", nombre: "Login" },
          ]}
          valueKey="id"
          labelKey="nombre"
          allLabel="Todas"
        />

        <BotonExportar onClick={onExportar} />
      </Box>
    </Box>
  );
}
