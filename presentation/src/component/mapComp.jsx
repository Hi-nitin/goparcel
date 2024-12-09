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


//A * algorithms is used

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './mapComp.css'; 
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';


const socket = io('http://localhost:3000/');

import Navbar from './navbar2';
import datasender from '../Api/datasender';

const yellowIcon = new L.Icon({
  iconUrl: 'data:image/jpeg;base64,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', // Replace with a yellow marker icon URL
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});


const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
};

// A* Algorithm 
const aStar = (start, goal, nodes, edges) => {
  const openSet = new Set([start.id]);
  const cameFrom = {};
  const gScore = {};
  const fScore = {};
  
  nodes.forEach(node => {
    gScore[node.id] = Infinity;
    fScore[node.id] = Infinity;
  });
  
  gScore[start.id] = 0;
  fScore[start.id] = haversineDistance(start.lat, start.lon, goal.lat, goal.lon);
  
  while (openSet.size) {
    const current = Array.from(openSet).reduce((lowest, nodeId) => {
      return fScore[nodeId] < fScore[lowest] ? nodeId : lowest;
    });
    
    if (current === goal.id) {
      const path = [];
      let temp = current;
      while (temp) {
        path.push(nodes.find(n => n.id === temp));
        temp = cameFrom[temp];
      }
      return path.reverse();
    }
    
    openSet.delete(current);
    
    edges.forEach(([u, v, weight]) => {
      if (u === current) {
        const tentativeGScore = gScore[u] + weight;
        if (tentativeGScore < gScore[v]) {
          cameFrom[v] = u;
          gScore[v] = tentativeGScore;
          fScore[v] = gScore[v] + haversineDistance(nodes.find(n => n.id === v).lat, nodes.find(n => n.id === v).lon, goal.lat, goal.lon);
          if (!openSet.has(v)) {
            openSet.add(v);
          }
        }
      }
    });
  }
  
  return [];
};

const Map = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [parcelDescription, setParcelDescription] = useState('');
  const [parcelweight, setParcelweight] = useState('');
  const [receivelocation, setreceivelocation] = useState('');
  const [deliverylocation, setdeliverylocation] = useState('');
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const[vokinei,setvkn]=useState('l')

  useEffect(() => {
    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
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
var mylocationarray=[]
  useEffect(() => {
    socket.on('getdeliverylocation', (locationdata) => {
      mylocationarray=[]
      Object.entries(locationdata[0]).map(([key, value]) => {


        console.log(value.latitude);
        mylocationarray.push({latitude:value.latitude,longitude:value.longitude})
        
             })
    // setNearbyLocations([locationdata])
   //console.log(locationdata);
 
   setNearbyLocations(mylocationarray)
   
    });

    return () => {
        socket.off('data');
    };
}, []);



  useEffect(() => {
    if (position && nearbyLocations.length > 0) {
      const nodes = [{ id: 'start', lat: position[0], lon: position[1] }, ...nearbyLocations.map((loc, index) => ({
        id: `loc${index}`,
        lat: loc.latitude,
        lon: loc.longitude,
      }))];
      
     
      const edges = [];
      nodes.forEach((node1) => {
        nodes.forEach((node2) => {
          if (node1.id !== node2.id) {
            const distance = haversineDistance(node1.lat, node1.lon, node2.lat, node2.lon);
            if (distance <= 1) { 
              edges.push([node1.id, node2.id, distance]);
            }
          }
        });
      });

      // 1km
      const goalNode = nodes.find(n => n.id !== 'start');
      if (goalNode) {
        const pathNodes = aStar(nodes[0], goalNode, nodes, edges);
        const pathIds = new Set(pathNodes.map(p => p.id));
        const filtered = nearbyLocations.filter(loc => {
          const nodeId = `loc${nearbyLocations.indexOf(loc)}`;
          return pathIds.has(nodeId) || haversineDistance(position[0], position[1], loc.latitude, loc.longitude) <= 1;
        });
        setFilteredMarkers(filtered);
      }
    }
  }, [position, nearbyLocations]);
  const navigate = useNavigate();


  useEffect( () => {
    socket.on('founddelivery',  (key) => {
    
   console.log(key)
   
  console.log('my socket='+socket.id);
  
  if(key==socket.id){
    navigate('/yourdeliveryguy');

  }else{
    
  }
      
     
    });

    return () => {
        socket.off('data');
    };
}, []);
const [btnName,setbtn]=useState('search')

  const handleFormSubmit = async (event) => {
    console.log(socket.id);
    
    event.preventDefault();
 setbtn('searching...........')
        try {
          const response = await fetch('http://localhost:3000/get-cookie', {
            method: 'GET',
            credentials: 'include', 
          });
          const data = await response.json();

if(data!=''){
try{
  const parceldes={
    pd:parcelDescription+' ,weight approx '+parcelweight+' ,Receive location :'+receivelocation+', Delivery location:'+deliverylocation,
    token:data.cookieValue
  }
 
  sessionStorage.setItem('myparcel', parcelDescription);
  socket.emit('sendData',  parceldes );
  
 
}catch(error){
  console.error('Error submitting parcel description:', error);
  alert('An error occurred while submitting the parcel description.');
}
}else{

}

        } catch (error) {
          console.error('Error fetching cookie:', error);
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
      <Navbar/>
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
            {filteredMarkers.map((loc, index) => (
              <Marker key={index} position={[loc.latitude, loc.longitude]}>
                <Popup>Nearby location</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <div className="information">
          <button onClick={() => setShowForm((prev) => !prev)}>
            {showForm ? 'Cancel finding' : 'Find delivery guy'}
          </button>
          {showForm && (
            <form onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="parcelDescription">Parcel Name:</label>
                <input
                  type="text"
                  id="parcelDescription"
                  value={parcelDescription}
                  onChange={(e) => setParcelDescription(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="parcelDescription">Parcel weight:</label>
                <input
                  type="text"
                  id="parcelDescription"
                  value={parcelweight}
                  onChange={(e) => setParcelweight(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="parcelDescription">Receive location:</label>
                <input
                  type="text"
                  id="parcelDescription"
                  value={receivelocation}
                  onChange={(e) => setreceivelocation(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="parcelDescription">Delivery location:</label>
                <input
                  type="text"
                  id="parcelDescription"
                  value={deliverylocation}
                  onChange={(e) => setdeliverylocation(e.target.value)}
                  required
                />
              </div>
              <button type="submit">{btnName}</button>
            </form>
          )}
          {vokinei}
        </div>
      </div>
    </>
  );
};

export default Map;
