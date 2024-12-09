// // socket.js
// const { Server } = require('socket.io');
// const cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken');
// const Signup=require('../schema/signup');
// const receiver_location_and_detail=require('../schema/receiverlocationanddetail')
// const mystatusSchema=require('../schema/mystatus')

// let clients = {};
// let deliverylocation={}
// function setupSocket(server) {
//   const io = new Server(server, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"]
//     }
//   });

//   io.on('connection', (socket) => {
//     console.log('New client connected');

//     socket.on('sendData', async(data) => {

//       try {
//         const decoded = jwt.decode(data.token); // No verification, just decoding
   
// const getinfo=await Signup.findOne({_id:decoded.userId});

// console.log(data);
// const detaildata={
//   uid:decoded.userId,
//   Name:getinfo.firstName,

//   pd:data.pd

// }
  
// clients[socket.id] = detaildata; 
// console.log('kera'+socket.id);

//         io.emit('updateClients', clients); 
//         // console.log(getinfo.firstName);
//       } catch (error) {
//         console.error('Error decoding token:', error);
//       }
  
      
//     });
// socket.on('init',()=>{
//   io.emit('updateClients', clients); 
// })

// socket.on('requestreceiverlocation',(cid)=>{
 
//   io.emit('sendreceiverlocation',cid)
  
// })

// socket.on('senddeliveryguylocation',(data)=>{
// // deliverylocation.push({id:socket.id,...data})
// deliverylocation[socket.id]=data


// io.emit('getdeliverylocation',[deliverylocation])
// console.log((deliverylocation));


// })

// socket.on('endservice',()=>{
//   io.emit('serviceend');
// })
// socket.on('deletecustomer',(data)=>{
 

//   delete clients[data]
//   io.emit('updateClients', clients); 
//   console.log('kkk'+data);
  
//   io.emit('founddelivery',data);
//   })
  
//   socket.on('receiverlocation&detail',async(data,data2,data3,data4)=>{
 
   
//   //   try{
//   // console.log(data);
//   // const dataforreceiverdetails = new receiver_location_and_detail({
//   //   customerId:data3,
//   //   deliveryId:data2,
//   //   receiverName:data.name,
//   //   receivercontact:data.phone,
//   //   latitude:data.latitude,
//   //   longitude:data.longitude
//   // });
//   // await dataforreceiverdetails.save();
//   // console.log('save vayo');
//   // io.emit('receiverdetailsfordeliveryguy',data2)
  
//   //   }catch(e){
//   //     console.log('save vaya naa..');
  
//   //   }
//   try {
//     console.log(data);
  
//     // Check if the record with the same customerId exists
//     const existingReceiverDetail = await receiver_location_and_detail.findOne({ customerId: data3 });
  
//     if (existingReceiverDetail) {
//       // If it exists, update the existing record
//       existingReceiverDetail.deliveryId = data2;
//       existingReceiverDetail.receiverName = data.name;
//       existingReceiverDetail.receiverContact = data.phone;
//       existingReceiverDetail.latitude = data.latitude;
//       existingReceiverDetail.longitude = data.longitude;
  
//       var mayalu=await existingReceiverDetail.save();
//       console.log('Updated existing record');
//     } else {
//       // If it doesn't exist, create a new record
//       const dataforreceiverdetails = new receiver_location_and_detail({
//         customerId: data3,
//         deliveryId: data2,
//         receiverName: data.name,
//         receiverContact: data.phone,
//         latitude: data.latitude,
//         longitude: data.longitude,
//         parcelDescription:data4
//       });
//   const mystatusdetails=new mystatusSchema({
//     customerId: data3,
//     deliveryId: data2,
//     parcelDescription:data4,
//     receiverName:data.name

//   });
//   var mayalu=await mystatusdetails.save();
//       await dataforreceiverdetails.save();
//       console.log('Inserted new record');
//     }

  
//     io.emit('receiverdetailsfordeliveryguy', data2,mayalu._id);


//   } catch (e) {
//     console.log('Error occurred while saving/updating:', e);
//   }
  
    
//   })
// socket.on('ireceivedyourdata',(data)=>{
//   console.log(data);
  
// io.emit('hasdeliveryguyacceptyourreceiverlocation',data)
// })

//     socket.on('disconnect', () => {
//       console.log('Client disconnected', socket.id);
//       delete clients[socket.id]; // Remove the client data on disconnect
//       delete deliverylocation[socket.id]
//       io.emit('updateClients', clients); // Emit updated clients list to all
//     });
//   });
// }

// module.exports =  setupSocket ;

// socket.js
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');

let clients = {};
let deliverylocation = {};


async function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected');


// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'goparcel'
});


async function getUserInfo(userId) {
  const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [userId]);
  return rows[0];
}

async function updateReceiverLocation(data) {
  console.log(data);
  
  const [rows] = await pool.execute('SELECT * FROM receiver_locations WHERE customerId = ?', [data.customerId]);

  if (rows.length > 0) {
    // Update existing record
    await pool.execute(
      'UPDATE receiver_locations SET deliveryId = ?, receiverName = ?, receiverContact = ?, latitude = ?, longitude = ?, parcelDescription = ? WHERE customerId = ?',
      [data.deliveryId, data.receiverName, data.receiverContact, data.latitude, data.longitude, data.parcelDescription, data.customerId]
    );
    console.log('Updated existing record');
  } else {
    // Insert new record
    await pool.execute(
      'INSERT INTO receiver_locations (customerId, deliveryId, receiverName, receiverContact, latitude, longitude, parcelDescription) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [data.customerId, data.deliveryId, data.receiverName, data.receiverContact, data.latitude, data.longitude, data.parcelDescription]
    );
    console.log('Inserted new record');


  const sql = `INSERT INTO mystatus (customerId, deliveryId, parcelDescription, receiverName) VALUES (?, ?, ?, ?)`;
  const values = [data.customerId, data.deliveryId, data.parcelDescription, data.receiverName];

  try {
    const [result] = await pool.execute(sql, values);
    console.log('Inserted new record with ID:', result.insertId);

    io.emit('receiverdetailsfordeliveryguy', data.deliveryId,result.insertId);
  } catch (error) {
    console.error('Error inserting record:', error);
  } finally {
    await connection.end();
  }
  }
}

    socket.on('sendData', async (data) => {
      try {
        const decoded = jwt.decode(data.token);
        const userInfo = await getUserInfo(decoded.userId);

        const detaildata = {
          uid: decoded.userId,
          Name: userInfo.firstName,
          pd: data.pd
        };

        clients[socket.id] = detaildata;
        io.emit('updateClients', clients);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    });

    socket.on('init', () => {
      io.emit('updateClients', clients);
    });

    socket.on('requestreceiverlocation', (cid) => {
      io.emit('sendreceiverlocation', cid);
    });

    socket.on('senddeliveryguylocation', (data) => {
      deliverylocation[socket.id] = data;
      io.emit('getdeliverylocation', [deliverylocation]);
    });

    socket.on('endservice', () => {
      io.emit('serviceend');
    });

    socket.on('deletecustomer', (data) => {
      delete clients[data];
      io.emit('updateClients', clients);
      io.emit('founddelivery', data);
    });

    socket.on('receiverlocation&detail', async (data,data2,data3,data4) => {
      console.log(data);
      
      try {
        await updateReceiverLocation({
          customerId: data3,
                  deliveryId: data2,
                  receiverName: data.name,
                  receiverContact: data.phone,
                  latitude: data.latitude,
                  longitude: data.longitude,
                  parcelDescription:data4
          
        });

        io.emit('receiverdetailsfordeliveryguy', data2);
      } catch (e) {
        console.log('Error occurred while saving/updating:', e);
      }
    });

    socket.on('ireceivedyourdata', (data) => {
      io.emit('hasdeliveryguyacceptyourreceiverlocation', data);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected', socket.id);
      delete clients[socket.id];
      delete deliverylocation[socket.id];
      io.emit('updateClients', clients);
    });
  });
}

module.exports = setupSocket;
