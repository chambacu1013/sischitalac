import { Button, Stack, Divider } from "@mui/material";

export default function FormActions({
  onCancel,

  textoGuardar,

  textoCancelar = "Cancelar",
}) {
  return (
    <>
      <Divider sx={{ mt: 3, mb: 3 }} />

      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button onClick={onCancel}>{textoCancelar}</Button>

        <Button variant="contained" type="submit">
          {textoGuardar}
        </Button>
      </Stack>
    </>
  );
}
