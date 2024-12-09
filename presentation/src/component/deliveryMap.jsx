import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import io from 'socket.io-client';

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
          setPosition(e.target.getLatLng());

          const sendDataToServer = async (latitude, longitude) => {
           
            if (latitude === null || longitude === null) {
              console.error('Latitude and longitude must be set.');
              return;
            }

            const latLngData = { latitude, longitude };
            const serverUrl = 'http://localhost:3000/saveLocation';



sessionStorage.setItem('lat', latitude);
           sessionStorage.setItem('lng', longitude);
            

            socket.emit('senddeliveryguylocation', latLngData);
         
           
          

          //   try {
          //     const response = await fetch(serverUrl, {
          //       method: 'POST',
          //       credentials: 'include',
          //       headers: {
          //         'Content-Type': 'application/json',
          //       },
          //       body: JSON.stringify(latLngData),
          //     });

          //     if (!response.ok) {
          //       throw new Error('Network response was not ok');
          //     }

          //     const data = await response.json();
          //     console.log('Success:', data);
          //   } catch (error) {
          //     console.error('Error:', error);
          //   }
          };

          sendDataToServer(lat, lng);
        },
      }}
    >
      <Popup>Move me!</Popup>
    </Marker>
  );
};

const MapComponent = () => {
  const [position, setPosition] = useState([51.505, -0.09]); // Default position
  const [loading, setLoading] = useState(true);
  const [mapVisible, setMapVisible] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPosition([latitude, longitude]);
        setLoading(false);
        const sendDataToServer = async (latitude, longitude) => {
          if (latitude === null || longitude === null) {
            console.error('Latitude and longitude must be set.');
            return;
          }

          const latLngData = { latitude, longitude };
          const serverUrl = 'http://localhost:3000/saveLocation';

          // try {
          //   const response = await fetch(serverUrl, {
          //     method: 'POST',
          //     credentials: 'include',
          //     headers: {
          //       'Content-Type': 'application/json',
          //     },
          //     body: JSON.stringify(latLngData),
          //   });

          //   if (!response.ok) {
          //     throw new Error('Network response was not ok');
          //   }

          //   const data = await response.json();
          //   console.log('Success:', data);
          // } catch (error) {
          //   console.error('Error:', error);

          // sessionStorage.setItem('lat', latitude);
          // sessionStorage.setItem('lng', longitude);
          // }
        };

        sendDataToServer(latitude, longitude);
      },
      (error) => {
        console.error('Error getting geolocation', error);
        setLoading(false);
      }
    );
  }, []);
//chnage this useEffect for real detail tracing
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.hidden) {
        const serverUrl = 'http://localhost:3000/deleteLocation';
        try {
          await fetch(serverUrl, {
            method: 'DELETE',
            credentials: 'include',
          });
        } catch (error) {
          console.error('Error sending delete request:', error);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const toggleMapVisibility = () => {
    setMapVisible(!mapVisible);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={toggleMapVisibility}>
        {mapVisible ? 'Hide Map' : 'Show Map'}
      </button>
      {mapVisible && (
        <MapContainer center={position} zoom={13} style={{ height: "100vh", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MoveableMarker position={position} setPosition={setPosition} />
        </MapContainer>
      )}
    </div>
  );
};

export default MapComponent;
