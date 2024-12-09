// // import React, { useEffect, useState } from 'react';
// // import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// // import L from 'leaflet';
// // import 'leaflet/dist/leaflet.css';
// // import './mapComp.css'

// // // Define a red marker icon
// // const redIcon = new L.Icon({
// //   iconUrl: 'https://c0.klipartz.com/pngpicture/754/334/gratis-png-ilustracion-de-icono-de-ubicacion-mapa-de-geolocalizacion-iconos-de-computadora-mapa-thumbnail.png',
// //   iconSize: [32, 32],
// //   iconAnchor: [16, 32],
// //   popupAnchor: [0, -32],
// //   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// //   shadowSize: [41, 41],
// // });

// // const Map = () => {
// //   const [position, setPosition] = useState(null);
// //   const [error, setError] = useState(null);
// //   const [nearbyLocations, setNearbyLocations] = useState([]);
// //   const [showForm, setShowForm] = useState(false);
// //   const [parcelDescription, setParcelDescription] = useState('');

// //   // Define a nearby location relative to the current position
// //   const getNearbyLocation = (lat, lng) => [lat + 0.01, lng + 0.01];

// //   useEffect(() => {
// //     const handleSuccess = (position) => {
// //       const { latitude, longitude } = position.coords;
// //       console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
// //       setPosition([latitude, longitude]);
// //     };

// //     const handleError = (error) => {
// //       setError(error.message);
// //     };

// //     if (navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
// //     } else {
// //       setError('Geolocation is not supported by this browser.');
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (position) {
// //       const fetchNearbyLocations = async () => {
// //         try {
// //           const response = await fetch('http://localhost:3000/getLocation', {
// //             method: 'GET',
// //             credentials: 'include',
// //           });

// //           if (response.ok) {
// //             const result = await response.json();
// //             setNearbyLocations(result.data);
// //           } else {
// //             const errorResult = await response.json();
// //             // setError(errorResult.message);
// //           }
// //         } catch (err) {
// //           console.error('Error fetching nearby locations:', err);
// //           setError('An error occurred while fetching nearby locations.');
// //         }
// //       };

// //       fetchNearbyLocations();
// //       const intervalId = setInterval(fetchNearbyLocations, 2000);
// //       return () => clearInterval(intervalId);
// //     }
// //   }, [position]);

// //   const handleFormSubmit = async (event) => {
// //     event.preventDefault();
// //     try {
// //       const response = await fetch('http://localhost:3000/submit-parcel', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         credentials: 'include', // Include cookies in the request if needed
// //         body: JSON.stringify({ parcelDescription }),
// //       });

// //       if (response.ok) {
// //         const result = await response.json();
// //         alert(result.message); // Handle success
// //       } else {
// //         const errorResult = await response.json();
// //         alert(errorResult.message); // Handle error
// //       }
// //     } catch (error) {
// //       console.error('Error submitting parcel description:', error);
// //       alert('An error occurred while submitting the parcel description.');
// //     }
// //   };

// //   if (error) {
// //     return <div>Error: {error}</div>;
// //   }

// //   if (position === null) {
// //     return <div>Loading...</div>;
// //   }

// //   return (
// //     <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
// //       <div style={{ flex: 1 }}>
// //         <MapContainer center={position} zoom={13} style={{ height: '80%', width: '100%' }}>
// //           <TileLayer
// //             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// //           />
// //           <Marker position={position} icon={redIcon}>
// //             <Popup>You are here</Popup>
// //           </Marker>
// //           {nearbyLocations.map((loc, index) => (
// //             <Marker key={index} position={[loc.latitude, loc.longitude]}>
// //               <Popup>Nearby location</Popup>
// //             </Marker>
// //           ))}
// //         </MapContainer>
// //       </div>
// //       <button
// //         onClick={() => setShowForm((prev) => !prev)}
// //         style={{ padding: '10px', margin: '10px', alignSelf: 'center' }}
// //       >
// //         {showForm ? 'Cancel finding' : 'find delivery guy'}
// //       </button>
// //       {showForm && (
// //         <form onSubmit={handleFormSubmit} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
// //           <div style={{ marginBottom: '10px' }}>
// //             <label htmlFor="parcelDescription">Parcel Description:</label>
// //             <input
// //               type="text"
// //               id="parcelDescription"
// //               value={parcelDescription}
// //               onChange={(e) => setParcelDescription(e.target.value)}
// //               required
// //               style={{ marginLeft: '10px' }}
// //             />
// //           </div>
// //           <button type="submit">Search</button>
// //         </form>
// //       )}
// //     </div>
// //   );
// // };

// // export default Map;
// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import './mapComp.css'; // Updated CSS import
// import Navbar from './navbar2';

// // Define a custom yellow marker icon
// const yellowIcon = new L.Icon({
//   iconUrl: 'https://example.com/yellow-marker-icon.png', // Replace with a yellow marker icon URL
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32],
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
//   shadowSize: [41, 41],
// });

// const Map = () => {
//   const [position, setPosition] = useState(null);
//   const [error, setError] = useState(null);
//   const [nearbyLocations, setNearbyLocations] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [parcelDescription, setParcelDescription] = useState('');

//   useEffect(() => {
//     const handleSuccess = (position) => {
//       const { latitude, longitude } = position.coords;
//       console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
//       setPosition([latitude, longitude]);
//     };

//     const handleError = (error) => {
//       setError(error.message);
//     };

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
//     } else {
//       setError('Geolocation is not supported by this browser.');
//     }
//   }, []);

//   useEffect(() => {
//     if (position) {
//       const fetchNearbyLocations = async () => {
//         try {
//           const response = await fetch('http://localhost:3000/getLocation', {
//             method: 'GET',
//             credentials: 'include',
//           });

//           if (response.ok) {
//             const result = await response.json();
//             setNearbyLocations(result.data);
//           } else {
//             const errorResult = await response.json();
//             // setError(errorResult.message);
//           }
//         } catch (err) {
//           console.error('Error fetching nearby locations:', err);
//           setError('An error occurred while fetching nearby locations.');
//         }
//       };

//       fetchNearbyLocations();
//       const intervalId = setInterval(fetchNearbyLocations, 2000);
//       return () => clearInterval(intervalId);
//     }
//   }, [position]);

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch('http://localhost:3000/submit-parcel', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // Include cookies in the request if needed
//         body: JSON.stringify({ parcelDescription }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         alert(result.message); // Handle success
//       } else {
//         const errorResult = await response.json();
//         alert(errorResult.message); // Handle error
//       }
//     } catch (error) {
//       console.error('Error submitting parcel description:', error);
//       alert('An error occurred while submitting the parcel description.');
//     }
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (position === null) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
    
//   <Navbar/>
//     <div className="map-main-container">
//       <div className="map">
//         <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           <Marker position={position} >
//             <Popup>You are here</Popup>
//           </Marker>
//           {nearbyLocations.map((loc, index) => (
//             <Marker key={index} position={[loc.latitude, loc.longitude]}>
//               <Popup>Nearby location</Popup>
//             </Marker>
//           ))}
//         </MapContainer>
//       </div>
//       <div className="information">
//         <button onClick={() => setShowForm((prev) => !prev)}>
//           {showForm ? 'Cancel finding' : 'Find delivery guy'}
//         </button>
//         {showForm && (
//           <form onSubmit={handleFormSubmit}>
//             <div>
//               <label htmlFor="parcelDescription">Parcel Description:</label>
//               <input
//                 type="text"
//                 id="parcelDescription"
//                 value={parcelDescription}
//                 onChange={(e) => setParcelDescription(e.target.value)}
//                 required
//               />
//             </div>
//             <button type="submit">Search</button>
//           </form>
//         )}
//       </div>
//     </div>
//     </>
//   );
// };

// export default Map;

//k-nnnnn

// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import './mapComp.css';
// import Navbar from './navbar2';

// // Define a custom yellow marker icon
// const yellowIcon = new L.Icon({
//   iconUrl: 'https://example.com/yellow-marker-icon.png', // Replace with a yellow marker icon URL
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32],
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
//   shadowSize: [41, 41],
// });

// // Utility function to calculate the distance between two points using Haversine formula
// const haversineDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371; // Radius of Earth in km
//   const dLat = (lat2 - lat1) * (Math.PI / 180);
//   const dLon = (lon2 - lon1) * (Math.PI / 180);
//   const a = 
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; // Distance in km
// };

// const Map = () => {
//   const [position, setPosition] = useState(null);
//   const [error, setError] = useState(null);
//   const [nearbyLocations, setNearbyLocations] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [parcelDescription, setParcelDescription] = useState('');

//   useEffect(() => {
//     const handleSuccess = (position) => {
//       const { latitude, longitude } = position.coords;
//       console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
//       setPosition([latitude, longitude]);
//     };

//     const handleError = (error) => {
//       setError(error.message);
//     };

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
//     } else {
//       setError('Geolocation is not supported by this browser.');
//     }
//   }, []);

//   useEffect(() => {
//     if (position) {
//       const fetchNearbyLocations = async () => {
//         try {
//           const response = await fetch('http://localhost:3000/getLocation', {
//             method: 'GET',
//             credentials: 'include',
//           });

//           if (response.ok) {
//             const result = await response.json();
//             const filteredLocations = result.data.filter((loc) => {
//               const distance = haversineDistance(position[0], position[1], loc.latitude, loc.longitude);
//               return distance <= 1; // Filter locations within 1 km
//             });
//             setNearbyLocations(filteredLocations);
//           } else {
//             const errorResult = await response.json();
//             // setError(errorResult.message);
//           }
//         } catch (err) {
//           console.error('Error fetching nearby locations:', err);
//           setError('An error occurred while fetching nearby locations.');
//         }
//       };

//       fetchNearbyLocations();
//       const intervalId = setInterval(fetchNearbyLocations, 2000);
//       return () => clearInterval(intervalId);
//     }
//   }, [position]);

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch('http://localhost:3000/submit-parcel', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // Include cookies in the request if needed
//         body: JSON.stringify({ parcelDescription }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         alert(result.message); // Handle success
//       } else {
//         const errorResult = await response.json();
//         alert(errorResult.message); // Handle error
//       }
//     } catch (error) {
//       console.error('Error submitting parcel description:', error);
//       alert('An error occurred while submitting the parcel description.');
//     }
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (position === null) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="map-main-container">
//         <div className="map">
//           <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />
//             <Marker position={position} >
//               <Popup>You are here</Popup>
//             </Marker>
//             {nearbyLocations.map((loc, index) => (
//               <Marker key={index} position={[loc.latitude, loc.longitude]}>
//                 <Popup>Nearby location</Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         </div>
//         <div className="information">
//           <button onClick={() => setShowForm((prev) => !prev)}>
//             {showForm ? 'Cancel finding' : 'Find delivery guy'}
//           </button>
//           {showForm && (
//             <form onSubmit={handleFormSubmit}>
//               <div>
//                 <label htmlFor="parcelDescription">Parcel Description:</label>
//                 <input
//                   type="text"
//                   id="parcelDescription"
//                   value={parcelDescription}
//                   onChange={(e) => setParcelDescription(e.target.value)}
//                   required
//                 />
//               </div>
//               <button type="submit">Search</button>
//             </form>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Map;
 

//dijask something

// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import './mapComp.css'; 
// import Navbar from './navbar2';

// // Define a custom yellow marker icon
// const yellowIcon = new L.Icon({
//   iconUrl: 'https://example.com/yellow-marker-icon.png', // Replace with a yellow marker icon URL
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32],
//   shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
//   shadowSize: [41, 41],
// });

// // Calculate the Haversine distance between two points
// const haversineDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371; // Radius of Earth in km
//   const dLat = (lat2 - lat1) * (Math.PI / 180);
//   const dLon = (lon2 - lon1) * (Math.PI / 180);
//   const a = 
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; // Distance in km
// };

// const Map = () => {
//   const [position, setPosition] = useState(null);
//   const [error, setError] = useState(null);
//   const [nearbyLocations, setNearbyLocations] = useState([]);
//   const [filteredLocations, setFilteredLocations] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [parcelDescription, setParcelDescription] = useState('');

//   useEffect(() => {
//     const handleSuccess = (position) => {
//       const { latitude, longitude } = position.coords;
//       console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
//       setPosition([latitude, longitude]);
//     };

//     const handleError = (error) => {
//       setError(error.message);
//     };

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
//     } else {
//       setError('Geolocation is not supported by this browser.');
//     }
//   }, []);

//   useEffect(() => {
//     if (position) {
//       const fetchNearbyLocations = async () => {
//         try {
//           const response = await fetch('http://localhost:3000/getLocation', {
//             method: 'GET',
//             credentials: 'include',
//           });

//           if (response.ok) {
//             const result = await response.json();
//             const locations = result.data;

//             // Filter locations within 1km
//             const filtered = locations.filter((loc) => {
//               const distance = haversineDistance(
//                 position[0], position[1], loc.latitude, loc.longitude
//               );
//               return distance <= 1; // 1km radius
//             });

//             setNearbyLocations(locations);
//             setFilteredLocations(filtered);
//           } else {
//             const errorResult = await response.json();
//             // Handle error
//           }
//         } catch (err) {
//           console.error('Error fetching nearby locations:', err);
//           setError('An error occurred while fetching nearby locations.');
//         }
//       };

//       fetchNearbyLocations();
//       const intervalId = setInterval(fetchNearbyLocations, 2000);
//       return () => clearInterval(intervalId);
//     }
//   }, [position]);

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch('http://localhost:3000/submit-parcel', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({ parcelDescription }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         alert(result.message);
//       } else {
//         const errorResult = await response.json();
//         alert(errorResult.message);
//       }
//     } catch (error) {
//       console.error('Error submitting parcel description:', error);
//       alert('An error occurred while submitting the parcel description.');
//     }
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (position === null) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="map-main-container">
//         <div className="map">
//           <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />
//             <Marker position={position}>
//               <Popup>You are here</Popup>
//             </Marker>
//             {filteredLocations.map((loc, index) => (
//               <Marker key={index} position={[loc.latitude, loc.longitude]}>
//                 <Popup>Nearby location</Popup>
//               </Marker>
//             ))}
//           </MapContainer>
//         </div>
//         <div className="information">
//           <button onClick={() => setShowForm((prev) => !prev)}>
//             {showForm ? 'Cancel finding' : 'Find delivery guy'}
//           </button>
//           {showForm && (
//             <form onSubmit={handleFormSubmit}>
//               <div>
//                 <label htmlFor="parcelDescription">Parcel Description:</label>
//                 <input
//                   type="text"
//                   id="parcelDescription"
//                   value={parcelDescription}
//                   onChange={(e) => setParcelDescription(e.target.value)}
//                   required
//                 />
//               </div>
//               <button type="submit">Search</button>
//             </form>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Map;



import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './mapComp.css'; // Updated CSS import
import Navbar from './navbar2';

// Define a custom yellow marker icon
const yellowIcon = new L.Icon({
  iconUrl: 'https://example.com/yellow-marker-icon.png', // Replace with a yellow marker icon URL
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Haversine formula to calculate distance between two coordinates
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};

const Map = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [path, setPath] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [parcelDescription, setParcelDescription] = useState('');

  useEffect(() => {
    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      setPosition([latitude, longitude]);
    };

    const handleError = (error) => {
      setError(error.message);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (position) {
      const fetchNearbyLocations = async () => {
        try {
          const response = await fetch('http://localhost:3000/getLocation', {
            method: 'GET',
            credentials: 'include',
          });

          if (response.ok) {
            const result = await response.json();
            const filteredLocations = result.data.filter(loc => {
              const distance = getDistance(
                position[0], position[1],
                loc.latitude, loc.longitude
              );
              return distance <= 1; // 1 km radius
            });
            setNearbyLocations(filteredLocations);
          } else {
            const errorResult = await response.json();
            // setError(errorResult.message);
          }
        } catch (err) {
          console.error('Error fetching nearby locations:', err);
          setError('An error occurred while fetching nearby locations.');
        }
      };

      fetchNearbyLocations();
      const intervalId = setInterval(fetchNearbyLocations, 2000);
      return () => clearInterval(intervalId);
    }
  }, [position]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/submit-parcel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request if needed
        body: JSON.stringify({ parcelDescription }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message); // Handle success
      } else {
        const errorResult = await response.json();
        alert(errorResult.message); // Handle error
      }
    } catch (error) {
      console.error('Error submitting parcel description:', error);
      alert('An error occurred while submitting the parcel description.');
    }
  };

  const handleFindPath = (destination) => {
    // Create a simple grid representation
    const grid = []; // Fill this with your grid representation of the map
    const path = astar(position, [destination.latitude, destination.longitude], grid);
    setPath(path);
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
      <div className="map-main-container">
        <div className="map">
          <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={yellowIcon}>
              <Popup>You are here</Popup>
            </Marker>
            {nearbyLocations.map((loc, index) => (
              <Marker
                key={index}
                position={[loc.latitude, loc.longitude]}
                eventHandlers={{
                  click: () => handleFindPath(loc),
                }}
              >
                <Popup>Nearby location</Popup>
              </Marker>
            ))}
            {path.length > 0 && (
              <Polyline positions={path} color="blue" weight={5} />
            )}
          </MapContainer>
        </div>
        <div className="information">
          <button onClick={() => setShowForm((prev) => !prev)}>
            {showForm ? 'Cancel finding' : 'Find delivery guy'}
          </button>
          {showForm && (
            <form onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="parcelDescription">Parcel Description:</label>
                <input
                  type="text"
                  id="parcelDescription"
                  value={parcelDescription}
                  onChange={(e) => setParcelDescription(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Search</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Map;


