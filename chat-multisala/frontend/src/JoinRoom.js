// src/JoinRoom.js
import React, { useState } from 'react';
import { socket } from './socket';
import { getDeviceId } from './deviceId';

export default function JoinRoom({ setView, setCurrentPin }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setPin(value);
      setError('');
    }
  };

  const handleJoin = async () => {
    if (!pin || isNaN(pin) || parseInt(pin) <= 0) {
      setError('El PIN debe ser un número entero positivo de hasta 6 cifras');
      return;
    }

    const deviceId = await getDeviceId();

    socket.emit('join_room', { pin, deviceId }, ({ success, error }) => {
      if (success) {
        localStorage.setItem('deviceId', deviceId);
        setCurrentPin(pin);
        setView('name');
      } else {
        setError(error);
      }
    });
  };

  return (
    <div className="center">
      <h2>Unirse a Sala</h2>
      <input
        type="text"
        value={pin}
        onChange={handleInputChange}
        placeholder="PIN (máx. 6 números positivos)"
        inputMode="numeric"
      />
      <button className="home" onClick={handleJoin}>Unirse</button>
      <button className="salir" onClick={() => setView('home')}>Regresar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
