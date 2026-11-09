import React from "react";

import LoginInput from "./LoginInput";

export default function LoginForm({
  usuario,
  password,
  loading,
  error,
  onUsuarioChange,
  onPasswordChange,
  onSubmit,
}) {
  return (
    <section className="login-content">
      <div className="login-card">
        <div className="login-header">
          <h2>Iniciar Sesión</h2>

          <p>Accede a tu cuenta de SISCHITALAC</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form className="login-form" onSubmit={onSubmit}>
          <LoginInput
            label="Usuario"
            placeholder="Ingresa tu usuario"
            value={usuario}
            onChange={onUsuarioChange}
          />

          <LoginInput
            label="Contraseña"
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={onPasswordChange}
          />

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </section>
  );
}
