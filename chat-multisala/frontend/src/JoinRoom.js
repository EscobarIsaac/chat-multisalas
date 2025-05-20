import React, { useState } from 'react';
import { socket } from './socket';
import { getDeviceId } from './deviceId';

export default function JoinRoom({ setView, setCurrentPin }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleJoin = async () => {
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
      <input type="text" value={pin} onChange={e => setPin(e.target.value)} placeholder="PIN" />
      <button onClick={handleJoin}>Unirse</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
