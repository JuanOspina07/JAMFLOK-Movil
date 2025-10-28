import React, { createContext, useState, useEffect } from "react";
import { 
  loginUser as loginService, 
  logout as logoutService, 
  getCurrentSession 
} from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

 useEffect(() => {
  const loadSession = async () => {
    console.log("Verificando sesión guardada...");
    const session = await getCurrentSession();
    if (session) {
      console.log("Sesión restaurada:", session);
      setUser({ idUsuario: session.idUsuario, idRol: session.idRol });
      setToken(session.token);
    } else {
      console.log("No hay sesión guardada");
    }
    setTimeout(() => {
        setLoading(false);
      }, 4800);
  };
  loadSession();
}, []);


  const login = async (nombreUsuario, contraseña) => {
    const result = await loginService(nombreUsuario, contraseña);
    if (result.success) {
      setUser(result.user);
      setToken(result.token);
    }
    return result;
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
