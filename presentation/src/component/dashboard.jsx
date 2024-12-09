import MapCompo from '../component/mapComp';
import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import DeliveryCompo from './deliveryCompo';
import Navbar from './navbar2';
const Dashboard=()=>{
const [CorD,setCorD]=useState();
const [cookieValue, setCookieValue] = useState('');


  const fetchCookie = async () => {
    try {
      const response = await fetch('http://localhost:3000/get-cookie', {
        method: 'GET',
        credentials: 'include', // Ensure cookies are sent with the request
      });
      const data = await response.json();
      setCookieValue(data.cookieValue || 'No cookie found');
        const decoded = jwtDecode(data.cookieValue);
        
       


        const response2 = await fetch('http://localhost:3000/tokendecoder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({ decoded })
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data2 = await response2.json(); 
       console.log(data2.guy) 
        
    
setCorD(data2.guy)
    } catch (error) {
      console.error('Error fetching cookie:', error);
    }
  };

  fetchCookie();



return(

  <>
  
   {CorD=='delivery'? <DeliveryCompo/>:null}
   {CorD=='customer'? <MapCompo/>:null}
  </>
)

}
export default Dashboard;