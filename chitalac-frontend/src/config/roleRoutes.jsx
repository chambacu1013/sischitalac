import {
  LayoutDashboard,
  Users,
  ClipboardList,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

export const roleRoutes = {
  ADMINISTRADOR: {
    home: "/LiquidacionDashboard",

    section: "GESTIÓN DEL SISTEMA",

    menus: [
      {
        path: "/LiquidacionDashboard",
        label: "Liquidación Quincenal",
        title: "Liquidación Quincenal",
        icon: LayoutDashboard,
      },

      {
        path: "/usuarios",
        label: "Gestión de Usuarios",
        title: "Gestión de Usuarios",
        icon: Users,
      },

      {
        path: "/proveedores",
        label: "Proveedores",
        title: "Proveedores",
        icon: ClipboardList,
      },
    ],
  },

  ASESOR: {
    home: "/auditorias",

    section: "CONTROL Y ANÁLISIS",

    menus: [
      {
        path: "/auditorias",
        label: "Auditoría de Acopios",
        title: "Auditoría de Acopios",
        icon: ShieldCheck,
      },

      {
        path: "/reporte-financiero",
        label: "Reportes Financiero",
        title: "Reportes Financiero",
        icon: BarChart3,
      },
    ],
  },
};
