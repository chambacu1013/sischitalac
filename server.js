const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");

const app = express();
// ==========================================
// IMPORTACIÓN DE RUTAS
// ==========================================
const authRoutes = require("./routes/authRoutes");
const usuarioRoutes = require("./routes/userRoutes");
const proveedorRoutes = require("./routes/proveedorRoutes");
const lecheRoutes = require("./routes/lecheRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const liquidacionRoutes = require("./routes/liquidacionRoutes");
const liquidacionDashboardRoutes = require("./routes/liquidacionDashboardRoutes");
const facturaRoutes = require("./routes/facturaRoutes");
const auditoriaRoutes = require("./routes/auditoriaRoutes");
const reporteFinancieroRoutes = require("./routes/reporteFinancieroRoutes");
// Usar las rutas
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proveedores", proveedorRoutes);
app.use("/api/leche", lecheRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/liquidaciones", liquidacionRoutes);
app.use("/api/liquidacion-dashboard", liquidacionDashboardRoutes);
app.use("/api/facturas", facturaRoutes);
app.use("/api/auditorias", auditoriaRoutes);
app.use("/api/reportes-financieros", reporteFinancieroRoutes);
// ==========================================
app.get("/", (req, res) => {
  res.json({
    ok: true,
    mensaje: "API SISCHITALAC funcionando",
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor de Chitalac corriendo en http://localhost:${PORT}`);
});
