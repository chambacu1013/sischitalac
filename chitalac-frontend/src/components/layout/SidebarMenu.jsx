import { NavLink } from "react-router-dom";
import { roleRoutes } from "../../config/roleRoutes";
import { authService } from "../../services/authService";
import "../../estilos/SidebarMenu.css";
export default function SidebarMenu() {
  const usuario = authService.obtenerUsuarioLogueado();

  const config = roleRoutes[usuario?.rol_nombre];

  if (!config) return null;

  return (
    <>
      <div className="sidebar-section">{config.section}</div>

      <nav className="sidebar-menu">
        {config.menus.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
              }
            >
              <Icon size={18} className="menu-icon" />

              <span className="menu-label">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
