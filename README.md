# Jamflok-movil 
Jamflok es una aplicación móvil desarrollada con React Native y Expo, diseñada para conectar negocios locales con clientes de forma rápida, visual e intuitiva.

La plataforma permite que emprendedores registren sus negocios (restaurantes, barberías, tiendas, servicios, etc.) y que los usuarios puedan descubrirlos fácilmente desde su celular, fomentando el comercio local mediante tecnología moderna.
#Caracteristicas Principales
* Registro y gestión de negocios
* Registro e inicio de sesión de usuarios
* Publicación de negocios con:
  - Nombre
  - Categoría
  - Ciudad, departamento y país
  - Dirección y teléfono
  - Horarios
  - Imagen del negocio

* Búsqueda y filtrado de negocios
* Organización por categorías y ubicación
* Recuperación de contraseña por correo
* Integración de pasarela de pagos
* Interfaz moderna, rápida y responsiva

# Tecnologias Utilizadas
## Frontend móvil
* React Native
* Expo
* JavaScript
* Axios
* React Navigation

## Backend

* Node.js
* Express
* MySQL

## Otros

* Git & GitHub
* Postman
* Metodología ágil Scrum
* Diseño UX/UI

# Estructura del proyecto
  Jamflok/
│
├── assets/            # Imágenes, íconos, splash
├── src/
│   ├── components/    # Componentes reutilizables
│   ├── screens/       # Pantallas principales
│   ├── navigation/    # Navegación de la app
│   ├── services/      # Conexión con la API
│   └── utils/          # Validaciones y helpers
│
├── App.js
├── app.json
└── package.json

# Instalación y ejecución
git clone https://github.com/tu-usuario/jamflok.git
cd jamflok

# Instalar dependencias
npm install

# Ejecutar App
npx expo start

Luego puedes:

Escanear el QR con Expo Go (Android/iOS) O ejecutar en emulador Android/iOS

# Configuración del backend 

import axios from "axios";

export const api = axios.create({
  baseURL: "http://TU_IP_LOCAL:3000/api"
});

# Objetivo del proyecto
Jamflok nace como un proyecto académico y emprendedor, con el objetivo de:

* Digitalizar pequeños y medianos negocios
* Facilitar que los clientes descubran servicios locales
* Aplicar conocimientos reales de desarrollo de software full stack
