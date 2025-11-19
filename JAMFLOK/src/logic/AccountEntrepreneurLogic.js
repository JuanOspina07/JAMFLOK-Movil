import { useState, useEffect } from "react";
import { getInfoEntrepreneur } from "../services/Entrepreneur";

export default function useAccountEntrepreneur(idUsuario) {
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const data = await getInfoEntrepreneur(idUsuario);
      setUserData(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idUsuario) loadUserData();
  }, [idUsuario]);

  return {
    modalVisible,
    setModalVisible,
    userData,
    loading,
    error,
  };
}
