import React from "react";
import { authService } from "../../services/authService";
import { UserCircle2 } from "lucide-react";
import "../../estilos/SidebarUser.css";

export default function SidebarUser() {
  const usuario = authService.obtenerUsuarioLogueado();

  if (!usuario) return null;

  return (
    <>
      {/* Logo del sistema */}

      <div className="sidebar-logo">
        <div className="logo-icon">C</div>

        <div className="logo-info">
          <h2>Quesería Chitalac</h2>
          <span>Panel Gerencial</span>
        </div>
      </div>

      {/* Tarjeta del usuario */}

      <div className="sidebar-user">
        <div className="user-avatar">
          <UserCircle2 size={42} />
        </div>

        <div className="user-info">
          <h3>
            {usuario.usu_nombre} {usuario.usu_apellido}
          </h3>

          <span>{usuario.rol_nombre}</span>
        </div>
      </div>
    </>
  );
}
