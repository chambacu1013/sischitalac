import { Avatar, Box, Tab, Chip, Tabs, Typography } from "@mui/material";

function TabsProveedores({
  proveedores = [],

  proveedorSeleccionado,

  onSeleccionarProveedor,
}) {
  const handleChange = (event, nuevoProveedor) => {
    onSeleccionarProveedor(nuevoProveedor);
  };
  const obtenerColorAvatar = (proveedor, seleccionado) => {
    if (seleccionado) {
      return "#1976D2"; // Azul
    }

    if (proveedor.estado_contable === "ABIERTA") {
      return "#2E7D32"; // Verde
    }

    return "#9E9E9E"; // Gris
  };
  return (
    <Box
      sx={{
        mb: 3,
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Tabs
        value={proveedorSeleccionado}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        {proveedores.map((proveedor) => (
          <Tab
            key={proveedor.prov_id}
            value={proveedor.prov_id}
            disableRipple
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  py: 0.5,
                }}
              >
                <Avatar
                  sx={{
                    width: 34,
                    height: 34,
                    bgcolor: obtenerColorAvatar(
                      proveedor,
                      proveedor.prov_id === proveedorSeleccionado,
                    ),
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: 700,
                    transition: "all .25s ease",
                  }}
                >
                  {`${proveedor.prov_nom?.charAt(0) ?? ""}${
                    proveedor.prov_ape?.charAt(0) ?? ""
                  }`}
                </Avatar>

                <Box
                  sx={{
                    textAlign: "left",
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color={
                      proveedor.prov_id === proveedorSeleccionado
                        ? "primary.main"
                        : "text.primary"
                    }
                  >
                    {proveedor.prov_nom} {proveedor.prov_ape}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {proveedor.prov_vereda}
                  </Typography>
                  <Chip
                    size="small"
                    label={proveedor.estado_contable}
                    color={
                      proveedor.estado_contable === "ABIERTA"
                        ? "success"
                        : "default"
                    }
                    sx={{
                      mt: 0.5,
                      height: 20,
                      fontSize: 10,
                    }}
                  />
                </Box>
              </Box>
            }
          />
        ))}
      </Tabs>
    </Box>
  );
}

export default TabsProveedores;
