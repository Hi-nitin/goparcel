import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000/');

function datasender(mydata) {

      socket.emit('sendData',  mydata );
      console.log(socket.id);
 
  
    }
  


export default datasender;
