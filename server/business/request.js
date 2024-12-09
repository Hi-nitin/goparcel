// const User=require('../schema/signup')
// const Parcel=require('../schema/parcel')
// const request=async (req, res) => {
//     try {
//   //    let myparcel=[];
//   //     let parcel_req=await Parcel.find();
     
//   //  for(i=0;i<parcel_req.length;i++){
    
//   //     let alldetail=await User.findById(parcel_req[i].userId);


//   //     myparcel.push({
//   //       Name:alldetail.firstName,
//   //       parcelName:parcel_req[i].parcelDescription
//   //     })
      
//   //   }

//   let parcel_req=await Parcel.find().populate('userId')
// res.json(parcel_req);
// console.log(parcel_req);


//   // Send parcels data as JSON response

//     } catch (error) {
//       console.error('Error fetching parcels:', error);
//       res.status(500).json({ message: 'Error fetching parcels' });
//     }

// }

// module.exports=request;
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: '', // Your MySQL password (empty in this case)
  database: 'goparcel', // Your database name
};

const request = async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    // SQL query to fetch parcels along with user details
    const [rows] = await connection.execute(`
      SELECT u.firstName, p.parcelDescription 
      FROM parcels p 
      JOIN users u ON p.userId = u.id
    `);
    
    res.json(rows);
    console.log(rows);

    await connection.end(); // Close the connection
  } catch (error) {
    console.error('Error fetching parcels:', error);
    res.status(500).json({ message: 'Error fetching parcels' });
  }
};

module.exports = request;
