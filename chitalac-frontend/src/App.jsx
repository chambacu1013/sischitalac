import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import LiquidacionDashboard from "./pages/LiquidacionDashboard";
import Auditorias from "./pages/Auditorias";
import { Usuarios } from "./pages/Usuarios";
import { Proveedores } from "./pages/Proveedores";
import ReporteFinanciero from "./pages/ReporteFinanciero";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login */}

        <Route path="/" element={<Login />} />

        {/* Inicio según el rol */}

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Navigate replace />
            </ProtectedRoute>
          }
        />

        {/* Administrador */}

        <Route
          path="/LiquidacionDashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <LiquidacionDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuarios"
          element={
            <ProtectedRoute>
              <Layout>
                <Usuarios />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/proveedores"
          element={
            <ProtectedRoute>
              <Layout>
                <Proveedores />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Asesor */}

        <Route
          path="/auditorias"
          element={
            <ProtectedRoute>
              <Layout>
                <Auditorias />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reporte-financiero"
          element={
            <ProtectedRoute>
              <Layout>
                <ReporteFinanciero />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* Ruta inexistente */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
