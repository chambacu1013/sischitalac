import { useMemo, useState } from "react";

import {
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { useReporteFinanciero } from "../hooks/useReporteFinanciero";

import KPICards from "../components/reportes/KPICards";
import TablaProveedores from "../components/reportes/TablaProveedores";

import { formatearMonedaCop } from "../utils/formatters";

import { descargarReporteFinancieroExcel } from "../services/reporteFinancieroService";

const ReporteFinanciero = () => {
  const hoy = new Date();

  const [mes, setMes] = useState(hoy.getMonth() + 1);
  const [anio, setAnio] = useState(hoy.getFullYear());

  const { data, loading, cancelar, cancelando } = useReporteFinanciero(
    mes,
    anio,
  );

  /* =====================================================
     DATOS SEGUROS
  ===================================================== */

  const proveedores = data?.proveedores || [];

  const proveedoresCriticos = data?.proveedoresCriticos || [];
  const balancePendiente = proveedores
    .filter((p) => p.estado_saldo === "PENDIENTE")
    .reduce((total, p) => total + Number(p.saldo_final || 0), 0);
  const kpis = data?.kpis || {
    totalLitros: 0,
    totalLeche: 0,
    totalDeducciones: 0,
    balance: 0,
  };

  /* =====================================================
     DATOS PARA EL GRÁFICO
  ===================================================== */

  const dataGrafica = useMemo(() => {
    return proveedores
      .map((p) => {
        const balance = Number(p.saldo_final || 0);

        return {
          prov_id: p.prov_id,
          prov_nombre: `${p.prov_nom || ""} ${p.prov_ape || ""}`.trim(),
          balance,
        };
      })
      .sort((a, b) => b.balance - a.balance);
  }, [proveedores]);
  const saldoMin =
    dataGrafica.length > 0
      ? Math.min(...dataGrafica.map((item) => item.balance))
      : 0;

  const saldoMax =
    dataGrafica.length > 0
      ? Math.max(...dataGrafica.map((item) => item.balance))
      : 0;

  const ticksSaldo = [...new Set([saldoMin, 0, saldoMax])];
  /* =====================================================
     ALTURA DINÁMICA DEL GRÁFICO
  ===================================================== */

  const alturaGrafica = Math.max(180, dataGrafica.length * 42);

  /* =====================================================
     DESCARGAR EXCEL
  ===================================================== */

  const handleDescargarExcel = async () => {
    try {
      await descargarReporteFinancieroExcel(mes, anio);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  /* =====================================================
     CARGANDO
  ===================================================== */

  if (loading) {
    return (
      <Box
        sx={{
          p: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography color="text.secondary">
          Cargando reporte financiero...
        </Typography>
      </Box>
    );
  }
  const ProveedorTick = ({ x, y, payload }) => {
    return (
      <text x={5} y={y} dy={4} textAnchor="start" fontSize={12} fill="#334155">
        {payload.value}
      </text>
    );
  };
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100%",
        backgroundColor: "#f4f7fb",
        p: {
          xs: 2,
          md: 3,
        },
      }}
    >
      {/* =====================================================
          ENCABEZADO
      ===================================================== */}

      <Box
        sx={{
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "#123b63",
            mb: 0.5,
          }}
        >
          Reporte Financiero
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#64748b",
          }}
        >
          Consolidado financiero de proveedores y operación mensual.
        </Typography>
      </Box>

      {/* =====================================================
          FILTROS + EXPORTACIÓN
      ===================================================== */}

      <Card
        sx={{
          mb: 3,
          p: 2,
          borderRadius: 2,
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 8px rgba(15, 23, 42, 0.05)",
        }}
      >
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2}
          alignItems={{
            xs: "stretch",
            md: "center",
          }}
          justifyContent="space-between"
        >
          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={2}
          >
            {/* MES */}

            <Box>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mb: 0.5,
                  fontWeight: 600,
                  color: "#475569",
                }}
              >
                Mes
              </Typography>

              <Select
                size="small"
                value={Number(mes)}
                onChange={(e) => setMes(Number(e.target.value))}
                sx={{
                  minWidth: 150,
                  backgroundColor: "#fff",
                }}
              >
                <MenuItem value={1}>Enero</MenuItem>

                <MenuItem value={2}>Febrero</MenuItem>

                <MenuItem value={3}>Marzo</MenuItem>

                <MenuItem value={4}>Abril</MenuItem>

                <MenuItem value={5}>Mayo</MenuItem>

                <MenuItem value={6}>Junio</MenuItem>

                <MenuItem value={7}>Julio</MenuItem>

                <MenuItem value={8}>Agosto</MenuItem>

                <MenuItem value={9}>Septiembre</MenuItem>

                <MenuItem value={10}>Octubre</MenuItem>

                <MenuItem value={11}>Noviembre</MenuItem>

                <MenuItem value={12}>Diciembre</MenuItem>
              </Select>
            </Box>

            {/* AÑO */}

            <Box>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mb: 0.5,
                  fontWeight: 600,
                  color: "#475569",
                }}
              >
                Año
              </Typography>

              <TextField
                size="small"
                type="number"
                value={anio}
                onChange={(e) => setAnio(Number(e.target.value))}
                inputProps={{
                  min: 2020,
                  max: 2100,
                }}
                sx={{
                  width: 130,
                  backgroundColor: "#fff",
                }}
              />
            </Box>
          </Stack>

          {/* EXPORTAR */}

          <Button
            variant="contained"
            onClick={handleDescargarExcel}
            sx={{
              minHeight: 40,
              px: 3,
              fontWeight: 700,
              textTransform: "none",
              borderRadius: 1.5,
              backgroundColor: "#1769aa",
              boxShadow: "none",

              "&:hover": {
                backgroundColor: "#12578d",
                boxShadow: "none",
              },
            }}
          >
            Exportar Excel
          </Button>
        </Stack>
      </Card>

      {/* =====================================================
          KPIs
      ===================================================== */}

      <Grid
        container
        spacing={2}
        sx={{
          mb: 3,
        }}
      >
        <Grid item xs={12} sm={6} lg={3}>
          <KPICards
            titulo="Total Litros Acopiados"
            valor={kpis.totalLitros}
            tipo="litros"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <KPICards
            titulo="Valor Total Leche"
            valor={kpis.totalLeche}
            tipo="moneda"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <KPICards
            titulo="Total Deducciones"
            valor={kpis.totalDeducciones}
            tipo="moneda"
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <KPICards
            titulo="Balance Neto"
            valor={balancePendiente}
            tipo="balance"
          />
        </Grid>
      </Grid>

      {/* =====================================================
          GRÁFICO
      ===================================================== */}

      <Card
        sx={{
          width: "100%",
          mb: 3,
          p: {
            xs: 2,
            md: 3,
          },
          borderRadius: 2,
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 8px rgba(15, 23, 42, 0.05)",
        }}
      >
        <Box
          sx={{
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#123b63",
            }}
          >
            Balance por proveedor
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#64748b",
              mt: 0.5,
            }}
          >
            Comparación del saldo final de cada proveedor durante el período
            seleccionado.
          </Typography>
        </Box>

        {dataGrafica.length === 0 ? (
          <Box
            sx={{
              height: 300,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#64748b",
            }}
          >
            No existen datos para el período seleccionado.
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              overflowX: "hidden",
            }}
          >
            <ResponsiveContainer width="100%" height={alturaGrafica}>
              <BarChart
                data={dataGrafica}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
                barCategoryGap={0}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />

                <XAxis
                  type="number"
                  domain={[saldoMin, saldoMax]}
                  ticks={ticksSaldo}
                  tick={{
                    fontSize: 12,
                    fill: "#64748b",
                  }}
                  tickFormatter={(valor) => formatearMonedaCop(valor)}
                />

                <YAxis
                  type="category"
                  dataKey="prov_nombre"
                  width={145}
                  tick={<ProveedorTick />}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  formatter={(valor, nombre, props) => {
                    const balanceReal = props?.payload?.balance ?? 0;

                    return [formatearMonedaCop(balanceReal), "Balance"];
                  }}
                  labelFormatter={(nombre) => `Proveedor: ${nombre}`}
                />

                <Bar
                  dataKey="balance"
                  name="Balance"
                  barSize={34}
                  radius={[0, 5, 5, 0]}
                >
                  {dataGrafica.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.balance >= 0 ? "#2e7d32" : "#d32f2f"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}
      </Card>

      {/* =====================================================
          TABLA DE PROVEEDORES
      ===================================================== */}

      <Box
        sx={{
          width: "100%",
        }}
      >
        <TablaProveedores
          proveedores={proveedores}
          criticos={proveedoresCriticos}
          onCancelar={cancelar}
          cancelando={cancelando}
        />
      </Box>
    </Box>
  );
};

export default ReporteFinanciero;
