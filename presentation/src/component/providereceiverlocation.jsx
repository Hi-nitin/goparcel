import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import io from 'socket.io-client';
import Navbar from './navbar2';
import { jwtDecode } from 'jwt-decode';
const socket = io('http://localhost:3000/');

const MoveableMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      console.log(`Marker moved to on map click: Latitude: ${lat}, Longitude: ${lng}`);
      setPosition(e.latlng);
    },
  });

  return (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend(e) {
          const { lat, lng } = e.target.getLatLng();
          console.log(`Marker moved by dragging: Latitude: ${lat}, Longitude: ${lng}`);
          setPosition([lat, lng]);

          const sendDataToServer = (latitude, longitude) => {
            if (latitude === null || longitude === null) {
              console.error('Latitude and longitude must be set.');
              return;
            }

            const latLngData = { latitude, longitude };
         


          };

          sendDataToServer(lat, lng);
        },
      }}
    >
      <Popup>Move me!</Popup>
    </Marker>
  );
};
import { useNavigate } from 'react-router-dom';
const MapComponent = () => {
  const [position, setPosition] = useState([51.505, -0.09]); // Default position
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition([latitude, longitude]);
        setLoading(false);
      },
      (error) => {
        console.error('Error getting geolocation', error);
        setLoading(false);
      }
    );
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Basic validation
    if (!name) {
        setError('Name is required');
        return;
    }
    const phoneRegex = /^[0-9]{10}$/; // Validate phone number (10 digits)
    if (!phone || !phoneRegex.test(phone)) {
        setError('Valid phone number is required (10 digits)');
        return;
    }

    const userData = {
        name,
        phone,
        latitude: position[0], // Current position
        longitude: position[1], // Current position
    };
    
    console.log('User Data:', userData);
    const fetchCookie = async () => {
      try {
          const response = await fetch('http://localhost:3000/get-cookie', {
              method: 'GET',
              credentials: 'include', // Ensure cookies are sent with the request
          });
          const data = await response.json();
          if (data) {
              return data;
          }
      } catch (error) {
          console.error('Error fetching cookie:', error);
      }
  };
    // Send data to the server
    const storedUser = sessionStorage.getItem('mydeliveryguyid');
    if (storedUser) {
      const token = await fetchCookie();
      try {
          const decodedToken = jwtDecode(token.cookieValue);
          if (decodedToken.userId) {
            const valueparcel = sessionStorage.getItem('myparcel');
    if (valueparcel) {
    
      socket.emit('receiverlocation&detail',userData,storedUser,decodedToken.userId,valueparcel);
    }
           
          }

      } catch (e) {
          alert('token error login again')
      }
     
    }



  }
  const fetchCookieuncle = async () => {
    try {
        const response = await fetch('http://localhost:3000/get-cookie', {
            method: 'GET',
            credentials: 'include', 
        });
        const data = await response.json();
        if (data) {
            return data;
        }
    } catch (error) {
        console.error('Error fetching cookie:', error);
    }
};
  useEffect(()=>{
    socket.on('hasdeliveryguyacceptyourreceiverlocation',async(data)=>{

      try{
        const token = await fetchCookieuncle();
        const decodedToken = jwtDecode(token.cookieValue);
        if(decodedToken.userId==data){
         
          navigate('/dashboard')
        }

      }catch(e){
alert('token expire'+e)
      }
     

    })
    
    return () => {
      socket.off('hasdeliveryguyacceptyourreceiverlocation');
    };
        },[])
     
    
        
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ flex: 2, padding: '10px', border: '1px solid #ccc', backgroundColor: '#e0f7fa' }}>
          <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MoveableMarker position={position} setPosition={setPosition} />
          </MapContainer>
        </div>
        <div style={{ flex: 1, padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc', backgroundColor: '#fff3e0' }}>
          <form onSubmit={handleLogin} style={{ width: '300px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', padding: '20px' }}>
            <h2 style={{ color: '#d32f2f', textAlign: 'center' }}>Enter your receiver details</h2>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Name:
              </label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} 
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Phone Number:
              </label>
              <input 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                required 
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} 
              />
              <small style={{ color: 'gray' }}>Format: 10 digits</small>
            </div>
            <button 
              type="submit" 
              style={{ 
                marginTop: '10px', 
                width: '100%', 
                padding: '10px', 
                backgroundColor: '#d32f2f', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MapComponent;
