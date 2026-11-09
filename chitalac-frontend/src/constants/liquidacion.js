/**
 * Estados de una liquidación.
 */
export const ESTADOS_LIQUIDACION = {
  LIQUIDADO: "Liquidado",

  PENDIENTE: "Pendiente",

  EN_PROCESO: "En proceso",
};

/**
 * Colores utilizados por los Chips de Material UI.
 */
export const COLORES_ESTADO = {
  [ESTADOS_LIQUIDACION.LIQUIDADO]: "success",

  [ESTADOS_LIQUIDACION.PENDIENTE]: "warning",

  [ESTADOS_LIQUIDACION.EN_PROCESO]: "info",
};

/**
 * Estado visual del período.
 */
export const ESTADO_PERIODO = {
  ABIERTO: "Abierta",

  CERRADO: "Cerrada",

  LIQUIDADO: "Liquidada",
};

/**
 * Configuración de la tabla.
 */
export const CONFIG_TABLA = {
  PAGE_SIZE: 8,

  PAGE_SIZE_OPTIONS: [5, 8, 10, 20, 50],
};

/**
 * Títulos del módulo.
 */
export const TITULOS = {
  MODULO: "Liquidación Quincenal",

  TABLA: "Proveedores",

  PANEL: "Detalle del proveedor",

  RESUMEN: "Resumen de Liquidación",
};

/**
 * Etiquetas utilizadas en el resumen.
 */
export const ETIQUETAS_RESUMEN = {
  LITROS: "Total litros",

  PRECIO: "Precio litro",

  BRUTO: "Valor bruto",

  PEDIDOS: "Pedidos",

  SALDO: "Saldo anterior",

  NETO: "TOTAL NETO",
};
