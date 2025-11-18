export const formatDate = (date) => {
  if (!(date instanceof Date)) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function formatDateReview(fechaOriginal) {
  if (!fechaOriginal) return "";

  const fecha = new Date(fechaOriginal);

  const dias = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", 
                 "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  const diaSemana = dias[fecha.getDay()];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const año = fecha.getFullYear();

  let horas = fecha.getHours();
  const minutos = fecha.getMinutes().toString().padStart(2, "0");
  const ampm = horas >= 12 ? "PM" : "AM";

  horas = horas % 12 || 12; // convierte 0 → 12

  return `${diaSemana}, ${dia} ${mes} ${año} · ${horas}:${minutos} ${ampm}`;
}
