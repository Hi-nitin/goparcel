import React from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const socket = io('http://localhost:3000/');

const Card = (props) => {

  const navigate = useNavigate();
const handlebhai=async()=>{

  try{
    const res=await fetch('http://localhost:3000/acceptedclient',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      credentials:'include',
    
      body: JSON.stringify({customerId:props.id,des:props.Cpd})
    })
    
    const result=await res.json();
    if(result.msg=='success'){
      socket.emit('deletecustomer',props.mykey);
    
      navigate('/underservice');
    }
    if(result.msg=='under service'){
      navigate('/underservice');
    }
    
    
    }catch(ex){
    console.log(ex);
    
    }
}
  return (
    <div className="flex flex-wrap justify-center p-4 gap-4">
      <div className="max-w-[200px] rounded-lg overflow-hidden shadow-lg flex flex-col border border-gray-600 hover:shadow-xl transition-shadow duration-300"> {/* Darker border */}
        <img 
          className="w-full h-32 object-cover"
          src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/3174456/profile-clipart-md.png" 
          alt="Sunset in the mountains" 
        />
        <div className="px-6 py-4 flex-grow">
          <div className="font-bold text-xl mb-2 text-center">Name: {props.name}</div>
          <p className="text-gray-700 text-base text-center">
            Parcel description: <b>{props.pd}</b>
          </p>
        </div>
        <button 
        onClick={()=>handlebhai()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '',
            cursor: 'pointer',
            fontSize: '16px',
            width: '100%',
            marginTop: 'auto',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default Card;
