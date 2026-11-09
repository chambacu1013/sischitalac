import { Card, CardContent, Typography, Box } from "@mui/material";

import {
  WaterDrop,
  AttachMoney,
  ReceiptLong,
  AccountBalance,
} from "@mui/icons-material";

import { formatearMonedaCop } from "../../utils/formatters";

const KPICards = ({ titulo, valor, tipo }) => {
  /* =====================================================
     COLOR
  ===================================================== */

  const getColor = () => {
    if (tipo === "balance") {
      return valor >= 0 ? "#16a34a" : "#dc2626";
    }

    if (tipo === "moneda") {
      return "#1976d2";
    }

    if (tipo === "litros") {
      return "#0284c7";
    }

    return "#475569";
  };

  /* =====================================================
     ICONO
  ===================================================== */

  const getIcon = () => {
    if (tipo === "litros") {
      return <WaterDrop />;
    }

    if (tipo === "moneda") {
      return <AttachMoney />;
    }

    if (titulo.toLowerCase().includes("deducc")) {
      return <ReceiptLong />;
    }

    if (tipo === "balance") {
      return <AccountBalance />;
    }

    return <AccountBalance />;
  };

  /* =====================================================
     FORMATEO
  ===================================================== */

  const formatear = () => {
    if (tipo === "moneda" || tipo === "balance") {
      return formatearMonedaCop(valor);
    }

    return Number(valor || 0).toLocaleString("es-CO");
  };

  const color = getColor();

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 2,
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 8px rgba(15, 23, 42, 0.05)",

        transition: "transform 0.2s ease, box-shadow 0.2s ease",

        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 5px 14px rgba(15, 23, 42, 0.10)",
        },
      }}
    >
      <CardContent
        sx={{
          p: 2.2,
          "&:last-child": {
            pb: 2.2,
          },
        }}
      >
        {/* =================================================
            CONTENIDO
        ================================================= */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          {/* TEXTO */}

          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#64748b",
                fontWeight: 600,
                fontSize: 13,
                mb: 0.8,
              }}
            >
              {titulo}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color,
                lineHeight: 1.2,
                fontSize: {
                  xs: "1.35rem",
                  md: "1.55rem",
                },
              }}
            >
              {formatear()}
            </Typography>
          </Box>

          {/* =================================================
              ICONO
          ================================================= */}

          <Box
            sx={{
              flexShrink: 0,

              width: 48,
              height: 48,

              borderRadius: 2,

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              color,

              backgroundColor:
                tipo === "balance"
                  ? valor >= 0
                    ? "#dcfce7"
                    : "#fee2e2"
                  : tipo === "litros"
                    ? "#e0f2fe"
                    : tipo === "moneda"
                      ? "#dbeafe"
                      : "#fef3c7",

              "& svg": {
                fontSize: 27,
              },
            }}
          >
            {getIcon()}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default KPICards;
