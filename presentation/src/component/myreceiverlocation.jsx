import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { json, useNavigate } from 'react-router-dom';
import './mapComp.css';
import io from 'socket.io-client';
import Navbar from './navbar2';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const socket = io('http://localhost:3000/');

const yellowIcon = new L.Icon({
    iconUrl: 'icon.jpg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
});

const Map = (props) => {
    const [error, setError] = useState(null);
    const [position, setPosition] = useState(null);
    const [demoPosition, setDemoPosition] = useState(null);
    const [receivername, setreceivername] = useState();
    const [receivercontact, setreceivercontact] = useState();
    const [parcel,setparcel]=useState()


    
    const getreceiverlocom = async () => {
        try {
            const response = await fetch('http://localhost:3000/abc', { credentials: 'include' });
            const data = await response.json();
            console.log(data);
setreceivername(data.receiverName)
setreceivercontact(data.receiverContact)
setparcel(data.parcelDescription)
            setDemoPosition([data.latitude, data.longitude]);
        } catch (e) {
            console.error('Error fetching data:', e);
        }
    };

    useEffect(() => {
        getreceiverlocom();
    }, []);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition([pos.coords.latitude, pos.coords.longitude]);
            },
            (err) => {
                setError(err.message);
            }
        );
    }, []);
    const navigate = useNavigate();

    const handlecomplete = async () => {
        const paras = sessionStorage.getItem('parcelid');
        if (paras) {
            try {
                const response = await fetch('http://localhost:3000/completed', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ paras }),
                    credentials: 'include'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log(result.msg);
                // Trigger confetti here
                confetti({
                    particleCount: 1000,
                    spread: 700,
                    origin: { y: 0.6 }
                });
                setTimeout(() => {
                    navigate('/dashboard')
                }, 2000);

            } catch (error) {
                console.log(error);
            }
        } else {
            alert('session out. login in again');
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (position === null) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            {demoPosition && (
                <div className="map-main-container">
                    <div className="map">
                        <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={position}>
                                <Popup>Your Location</Popup>
                            </Marker>
                            <Marker position={demoPosition}>
                                <Popup>Demo Location</Popup>
                            </Marker>
                            <Polyline positions={[position, demoPosition]} color="blue" />
                        </MapContainer>
                    </div>

                    <div className="information">
                        <div
                            style={{
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                padding: '20px',
                                width: '300px',
                                margin: '20px auto',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                backgroundColor: '#fff',
                                transition: 'transform 0.2s',
                                textAlign: 'left',
                            }}
                        >
                            <h2 style={{ margin: '0 0 10px 0', color: 'black' }}>Receiver Details</h2>
                            <p style={{ margin: '0 0 10px 0', color: 'black' }}><strong>Name:</strong>{ receivername}</p>
                            <p style={{ margin: '0 0 10px 0', color: 'black' }}><strong>Contact:</strong> {receivercontact }</p>
                            <p style={{ margin: '0 0 10px 0', color: 'black' }}><strong>Parcel:</strong> {parcel }</p>
                        </div>
                        <button
                            onClick={handlecomplete}
                            style={{
                                backgroundColor: 'green',
                                border: 'none',
                                padding: '10px 20px',
                                color: 'white',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'green')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'yellow')}
                        >
                            <p></p>
                            <p style={{ margin: 0 }}>Delivery completed</p>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Map;
