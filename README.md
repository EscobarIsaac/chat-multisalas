# 💬 Chat Multisalas con WebSocket

Este proyecto es una aplicación de **chat en tiempo real con múltiples salas**, desarrollada con:

- 🔧 Backend: Node.js + Express + Socket.IO  
- 💻 Frontend: React.js + Socket.IO Client  
- 🌐 Comunicación: WebSocket en red local

---

## ✅ ¿Qué hace este sistema?

- Permite crear y unirse a salas de chat con PIN único.
- Permite configurar el límite de usuarios por sala.
- Solo permite **un navegador o dispositivo por sala** (según IP).
- Elimina automáticamente salas vacías cuando todos los usuarios salen.
- Detecta usuarios por su dirección IP para impedir conexiones múltiples desde una misma computadora.
- Funciona desde celulares y otras PCs conectadas a la misma red local.

---

## 🛠️ Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 16 o superior recomendada)
- npm (viene incluido con Node.js)
- Visual Studio Code (recomendado)
- Una red local (WiFi, Ethernet o Hotspot del celular) para pruebas entre dispositivos

---

## 📦 Instalación del proyecto

Después de descargar o clonar el repositorio:

```bash
git clone https://github.com/usuario/proyecto-chat-multisalas.git
cd proyecto-chat-multisalas
```

### 🔧 1. Instala las dependencias del backend

```bash
cd backend
npm install
```

> Esto instalará: `express`, `cors`, `socket.io`

### 💻 2. Instala las dependencias del frontend

```bash
cd ../frontend
npm install
```

> Esto instalará React, `socket.io-client` y todas las dependencias de desarrollo

---

## 🚀 Cómo ejecutar el sistema

### 📌 Recomendación: usar Visual Studio Code

Abre el proyecto en Visual Studio Code y sigue estos pasos:

### 🪟 Abre dos terminales

1. Ve al menú `Terminal > Nueva terminal`.
2. Haz clic en el icono ➕ para abrir una **segunda terminal**.

### ▶️ Ejecutar el backend

En la primera terminal:

```bash
cd backend
node index.js
```

Esto iniciará el servidor WebSocket en:  
`http://localhost:3001`

### ▶️ Ejecutar el frontend

En la segunda terminal:

```bash
cd frontend
npm start
```

Esto abrirá el frontend React en tu navegador en:  
`http://localhost:3000`

---

## 🌐 Acceder desde otro dispositivo (PC o celular)

### Paso 1: Conecta todos los dispositivos a la misma red
Por ejemplo, al mismo WiFi o al **hotspot del celular**.

### Paso 2: Encuentra la IP local del servidor

En tu computadora (servidor), abre la terminal (CMD) y ejecuta:

```bash
ipconfig
```

Busca la línea que dice algo como:

```
Dirección IPv4. . . . . . : 192.168.98.76
```

### Paso 3: Desde otro dispositivo (celular/laptop), abre el navegador y escribe:

```
http://192.168.98.76:3000
```

✅ El sistema detectará automáticamente el backend en `192.168.98.76:3001` y se conectará.

---

## 🔐 Restricciones implementadas

- ✅ Solo una conexión por dispositivo a una sala.
- ✅ Si intentas conectarte desde otro navegador en la misma computadora, no se permitirá.
- ✅ Las salas se eliminan automáticamente si todos los usuarios salen.
- ✅ Se valida el acceso por **dirección IP del cliente** (no navegador, no cookies, no localStorage).

---

## 🧪 Tecnologías usadas

| Componente   | Tecnología            |
|--------------|------------------------|
| Backend      | Node.js, Express, Socket.IO |
| Frontend     | React.js, socket.io-client  |
| Estilos      | CSS puro              |
| Comunicación | WebSocket (vía Socket.IO)  |

---

## 🧯 Posibles errores y soluciones

| Error | Solución |
|-------|----------|
| `Module not found: 'http' or 'socket.io'` | Asegúrate de ejecutar el backend dentro de la carpeta `backend/` |
| Otro dispositivo no puede conectar | Verifica que ambos estén en la misma red y estés usando la IP correcta |
| El navegador no abre React | Asegúrate de estar en `frontend/` y haber ejecutado `npm start` |
| Error "Este dispositivo ya está en otra sala" | No puedes usar otro navegador desde la misma computadora |

---

## 🤝 Autor

Proyecto desarrollado para fines académicos del curso:  
**Aplicaciones Distribuidas**  

**Autores:** Isaac Escobar, Alejandro Cuadrado
**Fecha:** Mayo 2025
