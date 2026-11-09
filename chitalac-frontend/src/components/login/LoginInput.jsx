import React from "react";
import { useState } from "react";

import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

export default function LoginInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
}) {
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const tipoInput =
    type === "password" ? (mostrarPassword ? "text" : "password") : type;
  const iconoIzquierdo =
    type === "password" ? (
      <LockOutlinedIcon fontSize="small" />
    ) : (
      <PersonOutlineIcon fontSize="small" />
    );
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>

      <div className="input-wrapper">
        <span className="input-icon">{iconoIzquierdo}</span>

        <input
          className="login-input"
          type={tipoInput}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />

        {type === "password" && (
          <button
            type="button"
            className="toggle-password"
            onClick={() => setMostrarPassword(!mostrarPassword)}
          >
            {mostrarPassword ? (
              <VisibilityOffOutlinedIcon fontSize="small" />
            ) : (
              <VisibilityOutlinedIcon fontSize="small" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
