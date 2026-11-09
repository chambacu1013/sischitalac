import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { authService } from "../../services/authService";

import SidebarUser from "./SidebarUser";
import SidebarMenu from "./SidebarMenu";

import "../../estilos/Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();

    navigate("/", {
      replace: true,
    });
  };

  return (
    <aside className="sidebar">
      <SidebarUser />

      <SidebarMenu />

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />

          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
