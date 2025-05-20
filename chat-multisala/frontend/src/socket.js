import { io } from "socket.io-client";
const hostname = window.location.hostname;
const socketURL = `http://${hostname}:3001`;
export const socket = io(socketURL);