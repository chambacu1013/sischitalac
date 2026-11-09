import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginBrand from "../components/login/LoginBrand";
import LoginForm from "../components/login/LoginForm";
import { roleRoutes } from "../config/roleRoutes";
import { authService } from "../services/authService";

import "../estilos/login.css";

export default function Login() {
  const navigate = useNavigate();

  /*=========================================
    ESTADOS
  =========================================*/

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /*=========================================
    LOGIN
  =========================================*/

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const respuesta = await authService.login({
        usuario,
        password,
      });

      localStorage.setItem("token", respuesta.token);
      localStorage.setItem("usuario", JSON.stringify(respuesta.usuario));

      const config = roleRoutes[respuesta.usuario.rol_nombre];

      navigate(config.home, {
        replace: true,
      });
    } catch (err) {
      setError(
        err.response?.data?.mensaje || "Usuario o contraseña incorrectos.",
      );
    } finally {
      setLoading(false);
    }
  };

  /*=========================================
    RENDER
  =========================================*/

  return (
    <div className="login-container">
      <LoginBrand />

      <LoginForm
        usuario={usuario}
        password={password}
        loading={loading}
        error={error}
        onUsuarioChange={(e) => setUsuario(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={handleLogin}
      />

      <footer className="login-footer">
        © 2026 Chitalac. Todos los derechos reservados.
      </footer>
    </div>
  );
}
