import { useEffect, useState } from "react";
import UnderserviceMap from './underserviceMap'
import Navbar from "./navbar2";
const underservice=()=>{
const [loading,setLoading]=useState(true);
const [mycustomerdetail,setmycustomerdetail]=useState()
const [pd,setpd]=useState();
const getdata=async()=>{
    try{
        const req= await fetch('http://localhost:3000/underservice',{
            credentials:'include'
        });
        const res=await req.json();
        
       
       setmycustomerdetail(res.msg)
       console.log(res.msg);
       
       setpd(res.msg.parceldescription)
       setLoading(false)
  
        }catch(e){
        console.log('error');
        
        }
}

useEffect(()=>{
getdata()
},[]);

  
    
return(
<>
<Navbar />
{mycustomerdetail &&
<UnderserviceMap cid={mycustomerdetail.customerId} name={mycustomerdetail.firstName+' '+mycustomerdetail.lastName} pd={pd} email={mycustomerdetail.email} phone={mycustomerdetail.phone} />
}
</>
)
}

export default underservice;