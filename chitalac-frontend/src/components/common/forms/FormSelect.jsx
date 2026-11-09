import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function FormSelect({
  label,

  name,

  value,

  options,

  onChange,
}) {
  return (
    <FormControl fullWidth size="small">
      <InputLabel>{label}</InputLabel>

      <Select label={label} name={name} value={value} onChange={onChange}>
        {options.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
