import { useEffect, useState } from "react";
import Underservice from "./underservice";
import Yourdeliverycompo from './yourdeliverycompo';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import Navbar from "./navbar2";
const socket = io('http://localhost:3000/');

const yourdeliveryguy=()=>{
    const navigate = useNavigate();

const [guydata,setData]=useState({});
    const fetchmyguy=async()=>{
        try {
            
            const response = await fetch('http://localhost:3000/getmyguy',{
                credentials:'include'
            }); 
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
           setData(result);
          
            console.log(result);
            
          } catch (error) {
          console.log(error);
          setData(result);
          } 
    }
useEffect(()=>{
fetchmyguy()
},[])

useEffect(() => {
    socket.on('serviceend', () => {
       navigate('/dashboard')

    });

    return () => {
        socket.off('data');
    };
}, []);
return(
    <>
    <Navbar/>
{
   guydata.dd?<Yourdeliverycompo id={guydata.dd.deliveryId} name={guydata.dd.firstName} email={guydata.dd.email} phone={guydata.dd.phone}/>:null
}
    {
        guydata.msg=='error'?<p>error getting your delivery guy </p>:null
    }

    </>
)

}
export default yourdeliveryguy;