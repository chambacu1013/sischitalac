import { Paper, Typography } from "@mui/material";

export default function FormSection({
  titulo,

  children,
}) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,

        borderRadius: 3,
      }}
    >
      <Typography variant="h6" mb={2}>
        {titulo}
      </Typography>

      {children}
    </Paper>
  );
}
