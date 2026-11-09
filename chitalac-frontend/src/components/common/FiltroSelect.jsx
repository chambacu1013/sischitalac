import { MenuItem, TextField } from "@mui/material";

export default function FiltroSelect({
  label,
  name,
  value,
  onChange,
  options = [],
  valueKey = "id",
  labelKey = "nombre",
  allLabel = "Todos",
}) {
  return (
    <TextField
      select
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      size="small"
      sx={{
        minWidth: 190,
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          bgcolor: "#fff",
        },
      }}
    >
      <MenuItem value="">{allLabel}</MenuItem>

      {options.map((item) => (
        <MenuItem key={item[valueKey]} value={item[valueKey]}>
          {item[labelKey]}
        </MenuItem>
      ))}
    </TextField>
  );
}
