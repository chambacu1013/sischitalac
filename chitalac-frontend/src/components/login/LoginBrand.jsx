import React from "react";

import { logo } from "../../assets/login";

import LoginIllustration from "./LoginIllustration";

export default function LoginBrand() {
  return (
    <section className="login-brand">
      {/* Logo */}

      <div className="logo-row">
        <div className="logo-badge">
          <img src={logo} alt="Logo Chitalac" className="brand-logo-image" />
        </div>
      </div>

      {/* Título */}

      <div className="system-title-block">
        <h1 className="system-title">SISCHITALAC</h1>

        <p className="system-subtitle">
          Sistema de Gestión de Productores de Leche
        </p>
      </div>
      <div className="brand-features">
        <div className="feature-item">
          <div className="feature-icon">📊</div>

          <span>Liquidación quincenal automatizada</span>
        </div>

        <div className="feature-item">
          <div className="feature-icon">🥛</div>

          <span>Control de acopio y calidad</span>
        </div>

        <div className="feature-item">
          <div className="feature-icon">📦</div>

          <span>Gestión de encargos y descuentos</span>
        </div>
      </div>
      {/* Ilustración */}

      <div className="illustration-wrap">
        <LoginIllustration />
      </div>
    </section>
  );
}
