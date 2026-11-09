import React from "react";
import { useLocation } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import "../../estilos/Header.css";
import { authService } from "../../services/authService";
import { roleRoutes } from "../../config/roleRoutes";

export default function Header() {
  const location = useLocation();

  const usuario = authService.obtenerUsuarioLogueado();

  const config = roleRoutes[usuario?.rol_nombre];
  const menuActivo = config?.menus.find(
    (menu) => menu.path === location.pathname,
  );
  const titulo = menuActivo?.title || "SISCHITALAC";

  const fecha = new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">{titulo}</h1>

        <p className="header-subtitle">
          Bienvenido, {usuario?.usu_nombre} {usuario?.usu_apellido}
        </p>
      </div>

      <div className="header-right">
        <CalendarDays size={18} />

        <span>{fecha}</span>
      </div>
    </header>
  );
}
