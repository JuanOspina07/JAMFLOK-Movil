export const formatPrice = (valor) => {
  if (!valor) return "$0";

  const num = Number(valor).toLocaleString("es-CO");
  return `$${num.replace(",", ".")}`;
};
