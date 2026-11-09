import { Snackbar, Alert } from "@mui/material";

export default function AppSnackbar({ snackbar, onClose }) {
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Alert
        severity={snackbar.severity}
        variant="filled"
        elevation={6}
        onClose={onClose}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}
