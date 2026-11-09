module.exports = {
  logo: {
    x: 18,
    y: 15,
    width: 82,
  },

  titulo: {
    x: 110,
    y: 18,
  },
  provider: {
    quincena: {
      x: 20,
      y: 100,
      w: 120,
      h: 24,
    },
    fechaPago: {
      x: 140,
      y: 100,
      w: 105,
      h: 24,
    },
    finca: {
      x: 245,
      y: 100,
      w: 130,
      h: 24,
    },
    proveedor: {
      x: 20,
      y: 125,
      w: 200,
      h: 24,
    },
    documento: {
      x: 220,
      y: 125,
      w: 80,
      h: 24,
    },
    telefono: {
      x: 300,
      y: 125,
      w: 75,
      h: 24,
    },
  },

  milkTable: {
    x: 20,
    y: 160,
    w: 145,
    h: 210,
    rowHeight: 16,
    firstColumn: {
      x: 20,
      y: 160,
      dayWidth: 28,
      litersWidth: 44,
    },
    secondColumn: {
      x: 93,
      y: 160,
      dayWidth: 28,
      litersWidth: 44,
    },
  },

  ordersTable: {
    /*
    -------------------------------------------------
    Posición
    -------------------------------------------------
    */
    x: 175,
    y: 160,
    /*
    -------------------------------------------------
    Tamaño del cuadro de pedidos de la primera página
    -------------------------------------------------
    */
    w: 201,
    h: 330,
    /*
    -------------------------------------------------
    Filas
    -------------------------------------------------
    */
    rowHeight: 16,
    /*
    -------------------------------------------------
    Encabezado de la tabla
    -------------------------------------------------
    */
    headerHeight: 16,
    /*
    -------------------------------------------------
    Total de pedidos
    -------------------------------------------------
    */
    footerHeight: 16,
    /*
    -------------------------------------------------
    Separación interna
    -------------------------------------------------
    */
    padding: 3,
    /*
    -------------------------------------------------
    Cantidad máxima de filas que pueden imprimirse
    en la primera página.
    Si se supera este valor,
    automáticamente se crea la página 2.
    -------------------------------------------------
    */
    maxRowsFirstPage: 18,
    /*
    -------------------------------------------------
    Segunda página
    -------------------------------------------------
    */
    overflow: {
      title: "CONTINUACIÓN DE PEDIDOS",
      x: 20,
      y: 40,
      w: 356,
      h: 520,
      rowHeight: 16,
    },
    /*
    -------------------------------------------------
    Columnas
    -------------------------------------------------
    */
    columns: {
      dia: 22,
      cantidad: 42,
      descripcion: 87,
      valor: 50,
    },
  },

  summary: {
    x: 20,
    y: 385,
    w: 145,
    h: 102,
    rowHeight: 17,
  },
  signatures: {
    y: 525,
    lineWidth: 105,
    left: {
      x: 35,
      text: "FIRMA PROVEEDOR",
    },
    right: {
      x: 245,

      text: "FIRMA EMPRESA RECOLECTORA DE LECHE",
    },
    image: {
      x: 252,
      y: 495,
      width: 105,
    },
  },
  legal: {
    x: 25,
    y: 555,
    width: 346,
    height: 30,
  },
};
