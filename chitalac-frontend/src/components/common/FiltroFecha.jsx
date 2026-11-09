import { TextField } from "@mui/material";

export default function FiltroFecha({ label, name, value, onChange }) {
  return (
    <TextField
      type="date"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      size="small"
      InputLabelProps={{
        shrink: true,
      }}
      sx={{
        minWidth: 180,
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          bgcolor: "#fff",
        },
      }}
    />
  );
}
