import { TextField } from "@mui/material";

export default function FormInput({
  label,

  name,

  value,

  onChange,

  required = false,

  type = "text",

  disabled = false,
}) {
  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      value={value ?? ""}
      onChange={onChange}
      required={required}
      type={type}
      disabled={disabled}
      variant="outlined"
      size="small"
    />
  );
}
