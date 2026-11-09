import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BaseDialog from "./BaseDialog";

export default function ConfirmDialog({
  open,

  onClose,

  onConfirm,

  titulo,

  mensaje,

  textoConfirmar = "Aceptar",

  textoCancelar = "Cancelar",
}) {
  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      titulo={titulo}
      maxWidth="sm"
      actions={
        <>
          <Button onClick={onClose}>{textoCancelar}</Button>

          <Button variant="contained" color="error" onClick={onConfirm}>
            {textoConfirmar}
          </Button>
        </>
      }
    >
      <Typography>{mensaje}</Typography>
    </BaseDialog>
  );
}
