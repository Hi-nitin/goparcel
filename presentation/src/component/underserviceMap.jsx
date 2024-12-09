
// //A * algorithms is used

// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import './mapComp.css'; // Updated CSS import
// import io from 'socket.io-client';

// const socket = io('http://localhost:3000/');

// import Navbar from './navbar2';
// import datasender from '../Api/datasender';
// // Define a custom yellow marker icon
// const yellowIcon = new L.Icon({
//     iconUrl:'icon.jpg',
//       iconSize: [32, 32],
//     iconAnchor: [16, 32],
//     popupAnchor: [0, -32],
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
//     shadowSize: [41, 41],
// });

// // Haversine distance function
// const haversineDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371; // Radius of the Earth in kilometers
//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLon = (lon2 - lon1) * (Math.PI / 180);
//     const a = Math.sin(dLat / 2) ** 2 +
//         Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
//         Math.sin(dLon / 2) ** 2;
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c; // Distance in kilometers
// };

// // A* Algorithm Implementation (simplified for the example)
// const aStar = (start, goal, nodes, edges) => {
//     const openSet = new Set([start.id]);
//     const cameFrom = {};
//     const gScore = {};
//     const fScore = {};

//     nodes.forEach(node => {
//         gScore[node.id] = Infinity;
//         fScore[node.id] = Infinity;
//     });

//     gScore[start.id] = 0;
//     fScore[start.id] = haversineDistance(start.lat, start.lon, goal.lat, goal.lon);

//     while (openSet.size) {
//         const current = Array.from(openSet).reduce((lowest, nodeId) => {
//             return fScore[nodeId] < fScore[lowest] ? nodeId : lowest;
//         });

//         if (current === goal.id) {
//             const path = [];
//             let temp = current;
//             while (temp) {
//                 path.push(nodes.find(n => n.id === temp));
//                 temp = cameFrom[temp];
//             }
//             return path.reverse();
//         }

//         openSet.delete(current);

//         edges.forEach(([u, v, weight]) => {
//             if (u === current) {
//                 const tentativeGScore = gScore[u] + weight;
//                 if (tentativeGScore < gScore[v]) {
//                     cameFrom[v] = u;
//                     gScore[v] = tentativeGScore;
//                     fScore[v] = gScore[v] + haversineDistance(nodes.find(n => n.id === v).lat, nodes.find(n => n.id === v).lon, goal.lat, goal.lon);
//                     if (!openSet.has(v)) {
//                         openSet.add(v);
//                     }
//                 }
//             }
//         });
//     }

//     return [];
// };
// // Import marker icons
// import markerIconUrl from 'leaflet/dist/images/marker-icon.png';
// import markerIconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
// import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png';

// // Set up the default marker icon
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: markerIconRetinaUrl,
//   iconUrl: markerIconUrl,
//   shadowUrl: markerShadowUrl,
// });
// const Map = (props) => {
//     // const [position, setPosition] = useState(null);
//      const [error, setError] = useState(null);
//      const [nearbyLocations, setNearbyLocations] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//     const [parcelDescription, setParcelDescription] = useState('');
   
    

//       const [position, setPosition] = useState([51.505, -0.09]); // Your initial location
//   const [demoPosition,setdemoposition] = useState([31.51, 0.1]); // Demo location near you

//   useEffect(() => {
//     // Get user's current location
//     navigator.geolocation.getCurrentPosition((position) => {
//       setPosition([position.coords.latitude, position.coords.longitude]);
//     });

//     const long = sessionStorage.getItem('lng');
//     const lati = sessionStorage.getItem('lat');
   
//     console.log(long +'  '+ lati);
//     setdemoposition([lati,long])
    
//   }, []);

//     useEffect(() => {
//         if (position && nearbyLocations.length > 0) {
//             const nodes = [{ id: 'start', lat: position[0], lon: position[1] }, ...nearbyLocations.map((loc, index) => ({
//                 id: `loc${index}`,
//                 lat: loc.latitude,
//                 lon: loc.longitude,
//             }))];

//             // Filter nodes within 1km distance and create edges
//             const edges = [];
//             nodes.forEach((node1) => {
//                 nodes.forEach((node2) => {
//                     if (node1.id !== node2.id) {
//                         const distance = haversineDistance(node1.lat, node1.lon, node2.lat, node2.lon);
//                         if (distance <= 1) { // Only include edges within 1km
//                             edges.push([node1.id, node2.id, distance]);
//                         }
//                     }
//                 });
//             });

//             // Use A* to find a path within 1km radius
//             const goalNode = nodes.find(n => n.id !== 'start'); // Example goal node
//             if (goalNode) {
//                 const pathNodes = aStar(nodes[0], goalNode, nodes, edges);
//                 const pathIds = new Set(pathNodes.map(p => p.id));
//                 const filtered = nearbyLocations.filter(loc => {
//                     const nodeId = `loc${nearbyLocations.indexOf(loc)}`;
//                     return pathIds.has(nodeId) || haversineDistance(position[0], position[1], loc.latitude, loc.longitude) <= 1;
//                 });
//                 setFilteredMarkers(filtered);
//             }
//         }
//     }, [position, nearbyLocations]);

//     const handleFormSubmit = async (event) => {
//         event.preventDefault();

        

//         try {
//             const response = await fetch('http://localhost:3000/get-cookie', {
//                 method: 'GET',
//                 credentials: 'include', // Ensure cookies are sent with the request
//             });
//             const data = await response.json();
//             // setCookieValue(data.cookieValue || 'No cookie found');
//             if (data != '') {
//                 try {
//                     const parceldes = {
//                         pd: parcelDescription,
//                         token: data.cookieValue
//                     }
//                     datasender(parceldes)



//                 } catch (error) {
//                     console.error('Error submitting parcel description:', error);
//                     alert('An error occurred while submitting the parcel description.');
//                 }
//             } else {

//             }

//         } catch (error) {
//             console.error('Error fetching cookie:', error);
//         }
//     };


//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     if (position === null) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <>
//             <Navbar />
//             <div className="map-main-container">
//                 <div className="map">
                 


// <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
//      <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//        <Marker position={position}>
//         <Popup>Your Location</Popup>
//        </Marker>
//        <Marker position={demoPosition}>
//        <Popup>Demo Location</Popup>
//       </Marker>
//       <Polyline positions={[position, demoPosition]} color="blue" />

//      </MapContainer>

                    
//                 </div>

//                 <div className="information">

//                     <div style={{ color: 'black', padding: '20px', backgroundColor: 'white' }}>
//                         <div className="flex flex-wrap justify-center p-5 gap-7">
//                             <div className="max-w-[200px] rounded overflow-hidden shadow-lg"> {/* Custom width */}
//                                 <img className="w-full" src="https://th.bing.com/th/id/OIP.5kGyoxY2XZDixSK0JrZLjQHaFE?rs=1&pid=ImgDetMain" alt="Sunset in the mountains" />
//                                 <div className="px-6 py-4">

//                                     <p className="text-gray-700 text-base">
//                                         Name : {props.name}
//                                     </p>
//                                     <p className="text-gray-700 text-base">
//                                         Email : {props.email}
//                                     </p>
//                                     <p className="text-gray-700 text-base">
//                                         Phone : {props.phone}
//                                     </p>
//                                     <p className="text-gray-700 text-base">
//                                         Parcel-Name : {props.pd}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </>
//     );
// };

// export default Map;
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './mapComp.css';
import io from 'socket.io-client';
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

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

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
          fScore[v] =
            gScore[v] + haversineDistance(nodes.find(n => n.id === v).lat, nodes.find(n => n.id === v).lon, goal.lat, goal.lon);
          console.log(`f(${v}) = ${fScore[v]}`);
          if (!openSet.has(v)) {
            openSet.add(v);
          }
        }
      }
    });
  }

  return [];
};

const Map = (props) => {
  const [error, setError] = useState(null);
  const [position, setPosition] = useState(null);
  const [demoPosition, setDemoPosition] = useState([31.51, 0.1]);
  const [path, setPath] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);
    }, (err) => {
      setError(err.message);
    });

    const long = sessionStorage.getItem('lng');
    const lati = sessionStorage.getItem('lat');
    setDemoPosition([lati, long]);
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (position && demoPosition) {
      const nodes = [
        { id: 'start', lat: position[0], lon: position[1] },
        { id: 'demo', lat: demoPosition[0], lon: demoPosition[1] },
      ];

      const edges = [
        ['start', 'demo', haversineDistance(position[0], position[1], demoPosition[0], demoPosition[1])],
        ['demo', 'start', haversineDistance(position[0], position[1], demoPosition[0], demoPosition[1])],
      ];

      const result = aStar(nodes[0], nodes[1], nodes, edges);
      setPath(result);
      console.log("Final Path:", result);
    }
  }, [position, demoPosition]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (position === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
            {path.length > 0 && (
              <Polyline positions={path.map(p => [p.lat, p.lon])} color="blue" />
            )}
          </MapContainer>
        </div>

        <div className="information">
          <div style={{ color: 'black', padding: '20px', backgroundColor: 'white' }}>
            <div className="flex flex-wrap justify-center p-5 gap-7">
              <div style={{ border: '1px solid grey', borderRadius: '20px' }} className="max-w-[200px] rounded overflow-hidden shadow-lg">
                <img className="w-full" src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/3174456/profile-clipart-md.png" alt="Sunset in the mountains" />
                <div className="px-6 py-4">
                  <p className="text-gray-700 text-base">Name : {props.name}</p>
                  <p className="text-gray-700 text-base">Email : {props.email}</p>
                  <p className="text-gray-700 text-base">Phone : {props.phone}</p>
                  <p className="text-gray-700 text-base">Parcel-Name : {props.pd}</p>
                </div>
                <button onClick={() => {handledelete()}}><b style={{color:'black'}}>End Service</b></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Map;
