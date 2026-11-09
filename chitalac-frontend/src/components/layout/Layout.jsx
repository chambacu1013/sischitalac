import React from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

import "../../estilos/layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout">
      {/* Barra lateral */}

      <Sidebar />

      {/* Contenido */}

      <div className="layout-content">
        <Header />

        <main className="layout-main">{children}</main>
      </div>
    </div>
  );
}
