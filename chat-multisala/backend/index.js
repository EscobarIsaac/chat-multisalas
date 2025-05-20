const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { generatePIN } = require('./utils');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const rooms = {};     // { pin: { users: [], limit: number } }
const deviceMap = {}; // { ip: pin }

io.engine.on("connection", (rawSocket) => {
  console.log("Nueva conexión desde IP:", rawSocket.request.connection.remoteAddress);
});

io.on('connection', (socket) => {
  const clientIP = socket.handshake.address;

  console.log(`✅ Usuario conectado: ${socket.id} desde IP ${clientIP}`);

  socket.on('create_room', ({ limit }, callback) => {
    if (deviceMap[clientIP]) {
      return callback({ success: false, error: 'Este dispositivo ya está en otra sala.' });
    }

    const pin = generatePIN();
    rooms[pin] = {
      users: [socket.id],
      limit: parseInt(limit)
    };

    deviceMap[clientIP] = pin;
    socket.join(pin);
    console.log(`📌 Sala creada: ${pin} (limite: ${limit}) desde ${clientIP}`);
    callback({ success: true, pin });
  });

  socket.on('join_room', ({ pin }, callback) => {
    const room = rooms[pin];
    if (!room) return callback({ success: false, error: 'PIN inválido' });

    if (room.users.length >= room.limit) {
      return callback({ success: false, error: 'Sala llena' });
    }

    if (deviceMap[clientIP]) {
      return callback({ success: false, error: 'Este dispositivo ya está en otra sala.' });
    }

    room.users.push(socket.id);
    deviceMap[clientIP] = pin;
    socket.join(pin);
    io.to(pin).emit('user_joined', { userId: socket.id });

    callback({ success: true });
  });

  socket.on('send_message', ({ pin, message, author }) => {
    io.to(pin).emit('receive_message', { message, author });
    console.log(`💬 [${pin}] ${author}: ${message}`);
  });

  socket.on('leave_room', ({ pin, author }) => {
    socket.leave(pin);

    const room = rooms[pin];
    if (room) {
      room.users = room.users.filter(id => id !== socket.id);

      // Avisar que el usuario salió
      io.to(pin).emit('receive_message', {
        author: 'Sistema',
        message: `${author} salió del chat`
      });

      if (room.users.length === 0) {
        delete rooms[pin];
        console.log(`🗑️ Sala ${pin} eliminada (vacía)`);
      }
    }

    if (deviceMap[clientIP] === pin) {
      delete deviceMap[clientIP];
    }
  });

  socket.on('disconnect', () => {
    let disconnectedRoom = null;

    for (const pin in rooms) {
      const room = rooms[pin];
      const index = room.users.indexOf(socket.id);
      if (index !== -1) {
        room.users.splice(index, 1);
        disconnectedRoom = pin;

        if (room.users.length === 0) {
          delete rooms[pin];
          console.log(`🗑️ Sala ${pin} eliminada por desconexión`);
        }

        break;
      }
    }

    if (deviceMap[clientIP] === disconnectedRoom) {
      delete deviceMap[clientIP];
    }
  });
});

server.listen(3001, () => {
  console.log('🚀 Servidor WebSocket escuchando en http://localhost:3001');
});
