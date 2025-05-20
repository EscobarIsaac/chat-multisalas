import React, { useState } from 'react';
import { socket } from './socket';
import { getDeviceId } from './deviceId';

export default function CreateRoom({ setView, setCurrentPin }) {
  const [limit, setLimit] = useState(3);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    const deviceId = await getDeviceId();

    socket.emit('create_room', { limit, deviceId }, ({ success, pin, error }) => {
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
      <input type="number" value={limit} onChange={e => setLimit(e.target.value)} />
      <button onClick={handleCreate}>Crear</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
