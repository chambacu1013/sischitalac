import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Divider,
  DialogActions,
} from "@mui/material";

import "../../../estilos/baseDialog.css";

export default function BaseDialog({
  open,
  onClose,
  titulo,
  children,
  actions,
  maxWidth = "md",
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth}>
      <DialogTitle>
        <Typography variant="h5" fontWeight={700}>
          {titulo}
        </Typography>
      </DialogTitle>

      <Divider />

      <DialogContent>{children}</DialogContent>
      {actions && (
        <>
          <Divider />
          <DialogActions>{actions}</DialogActions>
        </>
      )}
    </Dialog>
  );
}
