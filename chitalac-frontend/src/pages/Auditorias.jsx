import AuditoriaToolbar from "../components/auditorias/AuditoriaToolbar";
import AuditoriaTabla from "../components/auditorias/AuditoriaTabla";

import { useAuditoria } from "../hooks/useAuditoria";

export default function Auditorias() {
  const {
    loading,
    rows,
    usuarios,
    proveedores,
    filtros,
    handleFiltro,
    exportarExcel,
  } = useAuditoria();

  return (
    <>
      <AuditoriaToolbar
        filtros={filtros}
        usuarios={usuarios}
        proveedores={proveedores}
        onChange={handleFiltro}
        onExportar={exportarExcel}
      />

      <AuditoriaTabla rows={rows} loading={loading} />
    </>
  );
}
