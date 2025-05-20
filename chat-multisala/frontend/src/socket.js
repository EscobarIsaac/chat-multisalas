// src/socket.js
import { io } from "socket.io-client";

// Detecta automáticamente la IP del servidor (no requiere .env)
const hostname = window.location.hostname;
const socketURL = `http://${hostname}:3001`;

export const socket = io(socketURL);
