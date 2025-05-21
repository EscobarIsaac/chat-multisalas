// src/CreateRoom.js
import React, { useState } from 'react';
import { socket } from './socket';
import { getDeviceId } from './deviceId';

export default function CreateRoom({ setView, setCurrentPin }) {
  const [limit, setLimit] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,3}$/.test(value)) {
      setLimit(value);
      setError('');
    }
  };

  const handleCreate = async () => {
    const numericLimit = parseInt(limit);

    if (!numericLimit || isNaN(numericLimit) || numericLimit <= 0) {
      setError('Debe ingresar un número entero positivo mayor que 0');
      return;
    }

    const deviceId = await getDeviceId();

    socket.emit('create_room', { limit: numericLimit, deviceId }, ({ success, pin, error }) => {
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
      <h2>Crear Sala</h2>
      <input
        type="text"
        value={limit}
        onChange={handleInputChange}
        placeholder="Número de usuarios"
        inputMode="numeric"
      />
      <button className="home" onClick={handleCreate}>Crear</button>
      <button className="salir" onClick={() => setView('home')}>Regresar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
