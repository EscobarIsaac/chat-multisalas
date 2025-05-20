// src/ChatRoom.js
import React, { useEffect, useState } from 'react';
import { socket } from './socket';

export default function ChatRoom({ currentPin, username }) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('receive_message', ({ author, message }) => {
      const isMe = author === username;
      const formatted =
        author === 'Sistema' ? message : isMe ? `Tú: ${message}` : `${author}: ${message}`;
      setChat(prev => [...prev, formatted]);
    });

    socket.on('user_joined', ({ userId }) => {
      setChat(prev => [...prev, `Usuario ${userId} se ha unido.`]);
    });

    return () => {
      socket.off('receive_message');
      socket.off('user_joined');
    };
  }, [username]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', {
        pin: currentPin,
        message,
        author: username || 'Anónimo'
      });
      setMessage('');
    }
  };

  const salir = () => {
    socket.emit('leave_room', { pin: currentPin, author: username });
    window.location.reload();
  };

  return (
    <div className="chat-container">
      <h2>Chat en Sala PIN: {currentPin}</h2>
      <div className="chat-box">
        {chat.map((msg, i) => {
          if (msg.startsWith("Tú: ")) {
            return <div key={i} className="message you">{msg}</div>;
          } else if (msg.startsWith("Usuario ")) {
            return <div key={i} className="message system">{msg}</div>;
          } else if (msg.includes("salió del chat")) {
            return <div key={i} className="message system">{msg}</div>;
          } else {
            return <div key={i} className="message other">{msg}</div>;
          }
        })}
      </div>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Mensaje"
      />
      <div>
        <button className="enviar" onClick={sendMessage}>Enviar</button>
        <button className="salir" onClick={salir}>Salir</button>
      </div>
    </div>
  );
}
