const ExcelJS = require("exceljs");

/*=====================================================
CREAR REPORTE DE AUDITORÍAS
=====================================================*/

const generarExcelAuditorias = async (auditorias, filtros = {}) => {
  const workbook = new ExcelJS.Workbook();

  const hoja = workbook.addWorksheet("Auditorías");

  crearEncabezado(hoja, filtros, auditorias);
  crearTabla(hoja, auditorias);
  aplicarEstilos(hoja);
  ajustarColumnas(hoja);
  crearPie(hoja, auditorias.length);
  return workbook;
};
const crearEncabezado = (hoja, filtros = {}, auditorias = []) => {
  // ===== TÍTULO PRINCIPAL =====
  hoja.mergeCells("A1:J1");

  const titulo = hoja.getCell("A1");

  titulo.value = "QUESERÍA CHITALAC";

  titulo.font = {
    size: 16,
    bold: true,
  };

  titulo.alignment = {
    horizontal: "center",
  };

  // ===== SUBTÍTULO =====
  hoja.mergeCells("A2:J2");

  const subtitulo = hoja.getCell("A2");

  subtitulo.value = "REPORTE DE AUDITORÍA DE ACOPIOS";

  subtitulo.font = {
    size: 13,
    bold: true,
  };

  subtitulo.alignment = {
    horizontal: "center",
  };
  const usuarioNombre = filtros.usuario
    ? `${auditorias[0]?.usu_nombre || ""} ${auditorias[0]?.usu_apellido || ""}`.trim()
    : "Todos";

  const proveedorNombre = filtros.proveedor
    ? `${auditorias[0]?.prov_nom || ""} ${auditorias[0]?.prov_ape || ""}`.trim()
    : "Todos";
  // ===== FECHA GENERACIÓN =====
  hoja.getCell("A4").value = "Generado:";
  hoja.getCell("B4").value = new Date().toLocaleString("es-CO");

  // ===== FILTROS =====
  hoja.getCell("A5").value = "Usuario:";
  hoja.getCell("B5").value = usuarioNombre;

  hoja.getCell("A6").value = "Proveedor:";
  hoja.getCell("B6").value = proveedorNombre;

  hoja.getCell("A7").value = "Acción:";
  hoja.getCell("B7").value = filtros.accion || "Todas";

  hoja.getCell("A8").value = "Periodo:";

  hoja.getCell("B8").value = `${filtros.fechaInicio || "Inicio"} - ${
    filtros.fechaFin || "Hoy"
  }`;
};
const crearTabla = (hoja, auditorias = []) => {
  // ===== FILA INICIAL DE LA TABLA =====
  const filaInicio = 10;

  // ===== COLUMNAS =====
  const columnas = [
    "Fecha",
    "Usuario",
    "Rol",
    "Proveedor",
    "Acción",
    "Antes (L)",
    "Después (L)",
    "Diferencia (L)",
    "Origen",
    "Detalle",
  ];

  // ===== INSERTAR CABECERA =====
  const filaCabecera = hoja.getRow(filaInicio);

  columnas.forEach((col, index) => {
    filaCabecera.getCell(index + 1).value = col;
  });

  filaCabecera.font = { bold: true };

  // ===== INSERTAR DATOS =====
  auditorias.forEach((a, i) => {
    const fila = hoja.getRow(filaInicio + 1 + i);

    fila.getCell(1).value = new Date(a.aud_timestamp);

    fila.getCell(2).value =
      `${a.usu_nombre || ""} ${a.usu_apellido || ""}`.trim();

    fila.getCell(3).value = a.rol_nombre || "-";

    fila.getCell(4).value = `${a.prov_nom || ""} ${a.prov_ape || ""}`.trim();

    fila.getCell(5).value = a.aud_accion || "-";

    fila.getCell(6).value =
      a.litros_anteriores !== null ? Number(a.litros_anteriores) : null;

    fila.getCell(7).value =
      a.litros_nuevos !== null ? Number(a.litros_nuevos) : null;

    fila.getCell(8).value = a.diferencia !== null ? Number(a.diferencia) : null;

    fila.getCell(9).value = a.aud_origen || "-";

    fila.getCell(10).value = a.aud_detalle || "-";
  });
};
const aplicarEstilos = (hoja) => {
  const filaInicio = 10;
  const filaCabecera = hoja.getRow(filaInicio);

  const totalColumnas = 10;

  // ===== ESTILO CABECERA =====
  for (let col = 1; col <= totalColumnas; col++) {
    const celda = filaCabecera.getCell(col);

    celda.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF1F4E78" }, // azul corporativo
    };

    celda.font = {
      color: { argb: "FFFFFFFF" },
      bold: true,
    };

    celda.alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    celda.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  }

  // ===== FILAS DE DATOS =====
  const totalFilas = hoja.rowCount;

  for (let i = filaInicio + 1; i <= totalFilas; i++) {
    const fila = hoja.getRow(i);

    for (let col = 1; col <= totalColumnas; col++) {
      const celda = fila.getCell(col);

      // Bordes
      celda.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      // Zebra rows
      if (i % 2 === 0) {
        celda.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFF5F7FB" },
        };
      }
    }
    // ===== WRAP TEXTO DETALLE =====
    fila.getCell(10).alignment = {
      wrapText: true,
      vertical: "top",
    };
    // ===== FORMATO FECHA =====
    fila.getCell(1).numFmt = "dd/mm/yyyy hh:mm";

    // ===== FORMATO NUMÉRICO =====
    fila.getCell(6).numFmt = "0.00";
    fila.getCell(7).numFmt = "0.00";
    fila.getCell(8).numFmt = "0.00";

    // ===== ALINEACIÓN =====
    fila.getCell(6).alignment = { horizontal: "right" };
    fila.getCell(7).alignment = { horizontal: "right" };
    fila.getCell(8).alignment = { horizontal: "right" };
  }

  // ===== AUTOFILTRO =====
  hoja.autoFilter = {
    from: {
      row: filaInicio,
      column: 1,
    },
    to: {
      row: filaInicio,
      column: totalColumnas,
    },
  };

  // ===== CONGELAR CABECERA =====
  hoja.views = [
    {
      state: "frozen",
      ySplit: filaInicio,
    },
  ];
};
const ajustarColumnas = (hoja) => {
  hoja.columns.forEach((columna, index) => {
    let maxLength = 10;

    columna.eachCell({ includeEmpty: true }, (celda) => {
      const valor = celda.value ? celda.value.toString() : "";

      maxLength = Math.max(maxLength, valor.length);
    });

    // ===== LÍMITES =====

    // Columna Detalle (muy larga)
    if (index === 9) {
      columna.width = 50;
    }
    // Columnas normales
    else {
      columna.width = Math.min(maxLength + 2, 25);
    }
  });
};
const crearPie = (hoja, totalRegistros) => {
  const filaInicio = 10;

  // última fila con datos
  const ultimaFila = hoja.rowCount + 2;

  // ===== TOTAL REGISTROS =====
  hoja.getCell(`A${ultimaFila}`).value = `Total registros: ${totalRegistros}`;

  hoja.getCell(`A${ultimaFila}`).font = {
    bold: true,
  };

  // ===== TEXTO SISTEMA =====
  hoja.getCell(`A${ultimaFila + 2}`).value =
    "Generado automáticamente por SISCHITALAC";

  hoja.getCell(`A${ultimaFila + 3}`).value =
    "Quesería Chitalac - Sistema de Auditoría";
};
module.exports = {
  generarExcelAuditorias,
};
