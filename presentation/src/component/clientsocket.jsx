import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000/');

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [clients, setClients] = useState({});

  useEffect(() => {
    socket.on('updateClients', (data) => {
      setClients(data);
      console.log(data);
      
    });

    return () => {
      socket.off('updateClients');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      socket.emit('sendData', { name, email });
      setName('');
      setEmail('');
    }
  };

  return (
    <div>
      <h1>Socket.IO Client</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>

      <h2>Connected Clients:</h2>
      <ul>
        {Object.entries(clients).map(([id, data]) => (
          <li key={id}>{`${data.name} - ${data.email}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
