// src/App.js
import React, { useState } from 'react';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import ChatRoom from './ChatRoom';
import './App.css';

function App() {
  const [view, setView] = useState('home');
  const [currentPin, setCurrentPin] = useState(null);
  const [username, setUsername] = useState('');

  return (
    <div className="App">
      <h1>Chat Multisalas</h1>
      {view === 'home' && (
        <>
          <button className="home" onClick={() => setView('create')}>Crear Sala</button>
          <button className="home" onClick={() => setView('join')}>Unirse a Sala</button>
        </>
      )}
      {view === 'create' && <CreateRoom setView={setView} setCurrentPin={setCurrentPin} />}
      {view === 'join' && <JoinRoom setView={setView} setCurrentPin={setCurrentPin} />}
      {view === 'name' && (
        <div className="center">
          <h2>Ingrese su nombre</h2>
          <input value={username} onChange={e => setUsername(e.target.value)} />
          <button className="home" onClick={() => setView('chat')}>Entrar al Chat</button>
        </div>
      )}
      {view === 'chat' && <ChatRoom currentPin={currentPin} username={username} />}
    </div>
  );
}

export default App;
