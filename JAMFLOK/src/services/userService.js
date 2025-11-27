//front bb

const API_BASE = "http://192.168.100.39:4000";   

export const getUsuarios = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/usuario/completo`);
    
    if (!res.ok) {
      console.log("Error HTTP:", res.status);
      return [];
    }
    
    const data = await res.json();
    console.log("USUARIOS CARGADOS:", data);
    return data;
  } catch (err) {
    console.log("Error de conexión:", err.message);
    return [];
  }
};

export const getUsuarioById = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/api/usuario/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};