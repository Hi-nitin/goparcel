// import { useEffect, useState } from "react";

// const RequestComponent = () => {
//   const [data, setData] = useState(null);  // State for storing fetched data
//   const [loading, setLoading] = useState(true);  // State for tracking loading status
//   const [error, setError] = useState(null);  // State for storing any errors

//   useEffect(() => {
//     const fetchData = async () => {
//       const url = 'http://localhost:3000/Drequest';
      
//       try {
//         const response = await fetch(url, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             // Add any additional headers if needed
//           },
//         });
        
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
        
//         const result = await response.json();
//         setData(result);
//         result.map((val)=>{
//           let info=val.userId;


          
//         })  // Update state with fetched data
//       } catch (error) {
//         setError(error.message);  // Update state with error message
//       } finally {
//         setLoading(false);  // Update loading status
//       }
//     };

//     fetchData();
//   },[]);  // Empty dependency array means this effect runs once when the component mounts

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1>Data:</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>  {/* Display data */}
//     </div>
//   );
// };

// export default RequestComponent;
import { useEffect, useState } from "react";
import datagetter from "../Api/datagetter";

import Navbar from './navbar3'
import io from 'socket.io-client';
const socket = io('http://localhost:3000/');
import Card from "./requestcard";
import { useNavigate } from 'react-router-dom';

const RequestComponent = () => {
  const [data, setData] = useState(null);  // State for storing fetched data
  const [loading, setLoading] = useState(true);  // State for tracking loading status
  const [error, setError] = useState(null);  // State for storing any errors
  const [userDetails, setUserDetails] = useState(null);  // State for storing user details fetched using userId
const [myreq,setMyreq]=useState(null);
const navigate = useNavigate();

useEffect(() => {
socket.emit('init')
  socket.on('updateClients', (data) => {

setMyreq([data]);

  });

  return () => {
    socket.off('updateClients');
  };
}, []);

const handleaccept=async(id,key,Cpd)=>{
try{
const res=await fetch('http://localhost:3000/acceptedclient',{
  method: 'POST',
  headers:{
    'Content-Type':'application/json'
  },
  credentials:'include',

  body: JSON.stringify({customerId:id,des:Cpd})
})

const result=await res.json();
if(result.msg=='success'){
  socket.emit('deletecustomer',key);

  navigate('/underservice');
}
if(result.msg=='under service'){
  navigate('/underservice');
}


}catch(ex){
console.log(ex);

}
}
const value = sessionStorage.getItem('key');
console.log(value);

useEffect(()=>{
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/puppy',{
        credentials:'include'
      });
      const result = await response.json();
    if(result.msg=='exists'){
      navigate('/underservice');
    }
    if(result.msg=='notexist'){
      setLoading(false)
    }
      console.log(result);
      
    } catch (error) {
      alert(error);
    }
  };
fetchData()
  
},[])

const handlebhai=()=>{
  alert()
}

if(loading) return <p>loading....</p>
  return (
    <>
     <Navbar/>
      <div className="flex flex-wrap justify-center p-4">
       {myreq!=null?Object.entries(myreq[0]).map(([key, value]) => (

        <div key={value.uid} onDoubleClick={()=>alert(key)}>
   
     <Card name={value.Name} pd={value.pd} id={value.uid} mykey={key} Cpd={value.pd}/>
     
        </div>
      )):null}
</div>

    </>
  );
};

export default RequestComponent;
