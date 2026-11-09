const ExcelJS = require("exceljs");

const aplicarBordes = (row) => {
  row.eachCell((cell) => {
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });
};

const formatoMoneda = '"$"#,##0;[Red]-"$"#,##0';

const generarExcelReporteFinanciero = async (
  proveedores = [],
  filtros = {},
) => {
  const workbook = new ExcelJS.Workbook();

  const hoja = workbook.addWorksheet("Reporte Financiero");

  /* =====================================================
     CONFIGURACIÓN DE COLUMNAS
  ===================================================== */

  hoja.columns = [
    {
      key: "proveedor",
      width: 28,
    },
    {
      key: "litros",
      width: 16,
    },
    {
      key: "valorLeche",
      width: 20,
    },
    {
      key: "deducciones",
      width: 20,
    },
    {
      key: "Balance Neto",
      width: 20,
    },
  ];

  /* =====================================================
     TÍTULO
  ===================================================== */

  hoja.mergeCells("A1:E1");

  hoja.getCell("A1").value = "REPORTE FINANCIERO";

  hoja.getCell("A1").font = {
    bold: true,
    size: 14,
  };

  hoja.getCell("A1").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  hoja.getRow(1).height = 24;

  /* =====================================================
     FILTROS
  ===================================================== */

  hoja.getCell("A3").value = "Mes:";
  hoja.getCell("B3").value = filtros.mes;

  hoja.getCell("A4").value = "Año:";
  hoja.getCell("B4").value = filtros.anio;

  hoja.getCell("A3").font = {
    bold: true,
  };

  hoja.getCell("A4").font = {
    bold: true,
  };

  /* =====================================================
     CABECERA
  ===================================================== */

  const filaInicio = 6;

  const columnas = [
    "Proveedor",
    "Litros",
    "Valor Leche",
    "Deducciones",
    "Balance Neto",
  ];

  columnas.forEach((col, i) => {
    const cell = hoja.getRow(filaInicio).getCell(i + 1);

    cell.value = col;

    cell.font = {
      bold: true,
      color: {
        argb: "FFFFFFFF",
      },
    };

    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "FF1F4E78",
      },
    };

    cell.alignment = {
      horizontal: "center",
      vertical: "middle",
    };
  });

  hoja.getRow(filaInicio).height = 22;

  aplicarBordes(hoja.getRow(filaInicio));

  /* =====================================================
     DATOS
  ===================================================== */

  proveedores.forEach((p, i) => {
    const fila = hoja.getRow(filaInicio + 1 + i);

    const nombreProveedor = `${p.prov_nom || ""} ${p.prov_ape || ""}`.trim();

    const litros = Number(p.litros || 0);

    const valorLeche = Number(p.valor_leche || 0);

    const deducciones = Number(p.deducciones || 0);

    const saldo = Number(p.saldo_final || 0);

    fila.getCell(1).value = nombreProveedor;

    fila.getCell(2).value = litros;

    fila.getCell(3).value = valorLeche;

    fila.getCell(4).value = deducciones;

    fila.getCell(5).value = saldo;

    /* FORMATO MONETARIO */

    fila.getCell(3).numFmt = formatoMoneda;

    fila.getCell(4).numFmt = formatoMoneda;

    fila.getCell(5).numFmt = formatoMoneda;

    /* ALINEACIÓN */

    fila.getCell(1).alignment = {
      horizontal: "left",
      vertical: "middle",
    };

    fila.getCell(2).alignment = {
      horizontal: "right",
      vertical: "middle",
    };

    fila.getCell(3).alignment = {
      horizontal: "right",
      vertical: "middle",
    };

    fila.getCell(4).alignment = {
      horizontal: "right",
      vertical: "middle",
    };

    fila.getCell(5).alignment = {
      horizontal: "right",
      vertical: "middle",
    };

    aplicarBordes(fila);
  });

  /* =====================================================
     TOTALES
  ===================================================== */

  const filaTotales = filaInicio + 1 + proveedores.length;

  const totalLitros = proveedores.reduce(
    (acc, p) => acc + Number(p.litros || 0),
    0,
  );

  const totalValor = proveedores.reduce(
    (acc, p) => acc + Number(p.valor_leche || 0),
    0,
  );

  const totalDeducciones = proveedores.reduce(
    (acc, p) => acc + Number(p.deducciones || 0),
    0,
  );

  /*
   * IMPORTANTE:
   * El Balance Neto debe utilizar
   * exactamente la misma lógica
   * que el KPI del frontend.
   *
   * Solo se suman los proveedores
   * que actualmente tienen cartera
   * PENDIENTE.
   */

  const totalBalance = Number(filtros.balanceNeto || 0);

  const fila = hoja.getRow(filaTotales);

  fila.getCell(1).value = "TOTALES";

  fila.getCell(2).value = totalLitros;

  fila.getCell(3).value = totalValor;

  fila.getCell(4).value = totalDeducciones;

  fila.getCell(5).value = totalBalance;

  fila.getCell(3).numFmt = formatoMoneda;

  fila.getCell(4).numFmt = formatoMoneda;

  fila.getCell(5).numFmt = formatoMoneda;

  fila.font = {
    bold: true,
  };

  fila.getCell(1).alignment = {
    horizontal: "left",
  };

  fila.getCell(2).alignment = {
    horizontal: "right",
  };

  fila.getCell(3).alignment = {
    horizontal: "right",
  };

  fila.getCell(4).alignment = {
    horizontal: "right",
  };

  fila.getCell(5).alignment = {
    horizontal: "right",
  };

  aplicarBordes(fila);

  /* =====================================================
     RESUMEN
  ===================================================== */

  const resumen = workbook.addWorksheet("Resumen");

  resumen.columns = [
    {
      key: "concepto",
      width: 28,
    },
    {
      key: "valor",
      width: 22,
    },
  ];

  resumen.mergeCells("A1:B1");

  resumen.getCell("A1").value = "RESUMEN FINANCIERO";

  resumen.getCell("A1").font = {
    bold: true,
    size: 14,
  };

  resumen.getCell("A1").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  resumen.getCell("A3").value = "Mes:";

  resumen.getCell("B3").value = filtros.mes;

  resumen.getCell("A4").value = "Año:";

  resumen.getCell("B4").value = filtros.anio;

  resumen.getCell("A3").font = {
    bold: true,
  };

  resumen.getCell("A4").font = {
    bold: true,
  };

  resumen.getCell("A6").value = "Total Litros";

  resumen.getCell("B6").value = totalLitros;

  resumen.getCell("A7").value = "Valor Leche";

  resumen.getCell("B7").value = totalValor;

  resumen.getCell("A8").value = "Deducciones";

  resumen.getCell("B8").value = totalDeducciones;

  resumen.getCell("A9").value = "Balance Neto";

  resumen.getCell("B9").value = totalBalance;

  ["B7", "B8", "B9"].forEach((cell) => {
    resumen.getCell(cell).numFmt = formatoMoneda;

    resumen.getCell(cell).alignment = {
      horizontal: "right",
    };
  });

  /* =====================================================
     PROVEEDORES EN RIESGO
  ===================================================== */

  const criticos = proveedores.filter(
    (p) => p.estado_saldo === "PENDIENTE",
  ).length;

  resumen.getCell("A11").value = "Proveedores en riesgo";

  resumen.getCell("B11").value = criticos;

  resumen.getCell("B11").font = {
    color: {
      argb: "FFFF0000",
    },
    bold: true,
  };

  /* =====================================================
     BORDES RESUMEN
  ===================================================== */

  for (let fila = 6; fila <= 11; fila++) {
    aplicarBordes(resumen.getRow(fila));
  }

  return workbook;
};

module.exports = {
  generarExcelReporteFinanciero,
};
