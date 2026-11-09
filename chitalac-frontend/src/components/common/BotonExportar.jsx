import { Button } from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";

export default function BotonExportar({ onClick, text = "Exportar Excel" }) {
  return (
    <Button
      variant="contained"
      startIcon={<DownloadIcon />}
      onClick={onClick}
      sx={{
        height: 40,
        px: 3,
        borderRadius: 2,
        textTransform: "none",
        fontWeight: 600,
        boxShadow: 2,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </Button>
  );
}
