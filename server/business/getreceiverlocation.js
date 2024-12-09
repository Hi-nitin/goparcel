// const schemadai=require('../schema/receiverlocationanddetail')
// const jwt = require('jsonwebtoken');
// const getrecloc=async(req,res)=>{


// try{
//     const decodedToken = jwt.decode(req.cookies.authToken);
    
//     try{
      
//         const getdata= await schemadai.findOne({deliveryId:decodedToken.userId});
       
//         if(getdata){
          
//             res.send(getdata)
//         }
        
//     }
// catch(e){
//     console.log('token expire');
    
// }
    
    
// }catch(e){
//     res.send({
//         msg:'token expire'
//     })

//     console.log('expire');
    
// }

// }

// module.exports=getrecloc

const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const dbConfig = {
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: '', // Your MySQL password (empty in this case)
  database: 'goparcel', // Your database name
};

const getrecloc = async (req, res) => {
  try {
    const decodedToken = jwt.decode(req.cookies.authToken);
    
    if (!decodedToken || !decodedToken.userId) {
      return res.status(401).send({ msg: 'Token expired or invalid' });
    }

    const connection = await mysql.createConnection(dbConfig);

    // Fetch receiver location details using deliveryId
    const [rows] = await connection.execute('SELECT * FROM receiver_locations WHERE deliveryId = ?', [decodedToken.userId]);
    const getdata = rows[0];

    if (getdata) {
      res.send(getdata);
    } else {
      res.status(404).send({ msg: 'No data found for this deliveryId' });
    }

    await connection.end();
  } catch (e) {
    console.error('Error:', e);
    res.status(500).send({ msg: 'Internal server error' });
  }
};

module.exports = getrecloc;
