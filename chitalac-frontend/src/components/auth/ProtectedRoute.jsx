import { Navigate, useLocation } from "react-router-dom";

import { authService } from "../../services/authService";

import { roleRoutes } from "../../config/roleRoutes";

export default function ProtectedRoute({ children }) {
  const token = authService.obtenerToken();

  const usuario = authService.obtenerUsuarioLogueado();

  const location = useLocation();

  if (!token || !usuario) {
    return <Navigate to="/" replace />;
  }

  const config = roleRoutes[usuario.rol_nombre];

  if (!config) {
    return <Navigate to="/" replace />;
  }

  const permitido = config.menus.some(
    (menu) => menu.path === location.pathname,
  );

  if (!permitido) {
    return <Navigate to={config.home} replace />;
  }

  return children;
}
