// src/styles/userStyles.js
import { StyleSheet } from 'react-native';

export const userStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fondo oscuro original
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // Blanco
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
  },

  // TARJETA DE USUARIO (con tu estilo oscuro)
  userCard: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E', // Gris oscuro
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#333333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    alignItems: 'center',
  },

  // Avatar con tu azul original
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#6C63FF', // TU COLOR AZUL ORIGINAL
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
    borderWidth: 3,
    borderColor: '#5A52E0',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  // Información
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFFFFF', // Blanco
    marginBottom: 6,
  },
  userDetail: {
    fontSize: 15,
    color: '#B0B0B0', // Gris claro
    marginTop: 4,
  },

  // Estado Activo / Inactivo (con tu estilo)
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 2,
  },
  statusActivo: {
    backgroundColor: '#1a3a1f',
    borderColor: '#27ae60',
  },
  statusInactivo: {
    backgroundColor: '#3a1a1a',
    borderColor: '#e74c3c',
  },
  statusText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  // Loading y vacío
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  emptyText: {
    fontSize: 18,
    color: '#888888',
    textAlign: 'center',
    marginTop: 60,
    fontWeight: '600',
  },
});