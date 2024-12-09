import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000/');

function datagetter() {

    useEffect(() => {
        socket.on('updateClients', (data) => {
       
          console.log(data);
          return 'k';
        });
    
        return () => {
          socket.off('updateClients');
        };
      }, []);
    
  

}
export default datagetter;
