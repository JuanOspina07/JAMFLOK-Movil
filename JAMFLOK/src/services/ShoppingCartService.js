// services/ShoppingCartService.js
import api from "./api";

export const processPayment = async (paymentData, token) => {
  try {
    const response = await api.post("/pagos", paymentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al procesar el pago"
    );
  }
};

export const getInvoice = async (invoiceId, token) => {
  try {
    const response = await api.get(`/facturas/${invoiceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener la factura"
    );
  }
};

export const downloadInvoice = async (invoiceId, token) => {
  try {
    const response = await api.get(`/facturas/${invoiceId}/descargar`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob', // Para archivos PDF
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al descargar la factura"
    );
  }
};

export const getUserOrders = async (token, idUsuario) => {
  try {
    const response = await api.get("/pedidos", {
      params: { idUsuario },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener los pedidos"
    );
  }
};

export const getOrderStatuses = async (token) => {
  try {
    const response = await api.get("/estados-pedido", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener los estados"
    );
  }
};

export const updateOrderStatus = async (orderId, statusId, token, notes = null) => {
  try {
    const response = await api.put(
      `/pedidos/${orderId}/estado`,
      { idEstado: statusId, notas: notes },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al actualizar el estado"
    );
  }
};

export const validateStock = async (productos, token) => {
  try {
    const response = await api.post("/productos/validar-stock", { productos }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al validar stock"
    );
  }
};

export const getUserBusinesses = async (token, idUsuario) => {
  try {
    const response = await api.get("/negocios/usuario", {
      params: { idUsuario },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener los negocios del usuario"
    );
  }
};

export const getBusinessOrders = async (token, idNegocio) => {
  try {
    const response = await api.get("/pedidos/negocio", {
      params: { idNegocio },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener los pedidos del negocio"
    );
  }
};