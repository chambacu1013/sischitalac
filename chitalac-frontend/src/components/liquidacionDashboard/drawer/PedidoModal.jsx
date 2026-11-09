import { useEffect, useState } from "react";

import { Grid } from "@mui/material";

import BaseDialog from "../../common/dialogs/BaseDialog";

import FormInput from "../../common/forms/FormInput";
import FormActions from "../../common/forms/FormActions";
import { crearPedido, actualizarPedido } from "../../../services/pedidoService";
import { calcularSubtotalPedido } from "../../../utils/pedidoUtils";

function PedidoModal({
  open,
  onClose,
  onSuccess,
  modo,
  pedido,
  quinId,
  mostrarSuccess,
  mostrarError,
}) {
  const [form, setForm] = useState({
    ped_fecha: "",
    ped_descripcion: "",
    ped_unidad: "",
    ped_cantidad: 1,
    ped_valor_unitario: 0,
    ped_subtotal: 0,
  });

  useEffect(() => {
    if (modo !== "editar" || !pedido) return;

    setForm({
      ped_fecha: pedido.ped_fecha?.split("T")[0] ?? "",
      ped_descripcion: pedido.ped_descripcion,
      ped_unidad: pedido.ped_unidad ?? "",
      ped_cantidad: Number(pedido.ped_cantidad),
      ped_valor_unitario: Number(pedido.ped_valor_unitario),
      ped_subtotal: Number(pedido.ped_subtotal),
    });
  }, [pedido, modo]);
  useEffect(() => {
    if (!open) {
      setForm({
        ped_fecha: "",
        ped_descripcion: "",
        ped_unidad: "",
        ped_cantidad: 1,
        ped_valor_unitario: 0,
        ped_subtotal: 0,
      });
    }
  }, [open]);

  const handleChange = (e) => {
    const {
      name,

      value,
    } = e.target;

    const nuevoFormulario = {
      ...form,

      [name]: value,
    };

    if (name === "ped_cantidad" || name === "ped_valor_unitario") {
      nuevoFormulario.ped_subtotal = calcularSubtotalPedido(
        Number(name === "ped_cantidad" ? value : nuevoFormulario.ped_cantidad),

        Number(
          name === "ped_valor_unitario"
            ? value
            : nuevoFormulario.ped_valor_unitario,
        ),
      );
    }

    setForm(nuevoFormulario);
  };

  const handleGuardar = async (e) => {
    e.preventDefault();

    try {
      const data = {
        quin_id: quinId,
        fecha: form.ped_fecha,
        descripcion: form.ped_descripcion,
        unidad: form.ped_unidad,
        cantidad: Number(form.ped_cantidad),
        valor_unitario: Number(form.ped_valor_unitario),
      };

      if (modo === "crear") {
        await crearPedido(data);
        mostrarSuccess("Pedido registrado correctamente.");
      } else {
        await actualizarPedido(pedido.ped_id, data);
        mostrarSuccess("Pedido actualizado correctamente.");
      }
      await onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      mostrarError(
        error.response?.data?.mensaje ??
          "Ocurrió un error al guardar el pedido.",
      );
    }
  };

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      titulo={modo === "editar" ? "Editar Pedido" : "Registrar Pedido"}
    >
      <form onSubmit={handleGuardar}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormInput
              type="date"
              name="ped_fecha"
              value={form.ped_fecha}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormInput
              label="Unidad"
              name="ped_unidad"
              value={form.ped_unidad}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormInput
              label="Descripción"
              name="ped_descripcion"
              value={form.ped_descripcion}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormInput
              label="Cantidad"
              type="number"
              name="ped_cantidad"
              value={form.ped_cantidad}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormInput
              label="Valor Unitario"
              type="number"
              name="ped_valor_unitario"
              value={form.ped_valor_unitario}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormInput
              label="Subtotal"
              name="ped_subtotal"
              value={form.ped_subtotal}
              disabled
            />
          </Grid>
        </Grid>

        <FormActions
          onCancel={onClose}
          textoGuardar={
            modo === "editar" ? "Actualizar Pedido" : "Guardar Pedido"
          }
        />
      </form>
    </BaseDialog>
  );
}

export default PedidoModal;
