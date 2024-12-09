// const acceptedclient=require('../schema/acceptedclient')
// const jwt = require('jsonwebtoken'); // Optional: If you're using JWT for token management

// const youdguy=async(req,res)=>{

// try{
//    const decoded = jwt.verify(req.cookies.authToken, 'your_jwt_secret_key');
   
// const fetchdata=await acceptedclient.findOne({customerId:decoded.userId}).populate('deliveryId');
// res.send(
// {
//     dd:fetchdata
// }
// )
// console.log();
    

// }
// catch(e){
//     console.log(e);
    
// res.send({
//     msg:'error'
// })
// }
// }

// module.exports=youdguy

const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'goparcel',
};

const youdguy = async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.authToken, 'your_jwt_secret_key');
    
    const connection = await mysql.createConnection(dbConfig);
    
    try {
      const [rows] = await connection.execute(
        `SELECT ac.*, r1.*, r2.*
         FROM accepted_clients ac
         JOIN users r1 ON ac.customerId = r1.id
         JOIN users r2 ON ac.deliveryId = r2.id
         WHERE ac.customerId = ?`,
        [decoded.userId]
      );
console.log(rows);

      if (rows.length > 0) {
        res.send({
          dd: rows[0], // You may adjust this based on your needs
        });
      } else {
        res.send({
          msg: 'No accepted clients found',
        });
      }
    } catch (error) {
      console.log(error);
      res.send({
        msg: 'Error fetching data',
      });
    } finally {
      await connection.end();
    }
  } catch (e) {
    console.log(e);
    res.send({
      msg: 'Invalid token or error',
    });
  }
};

module.exports = youdguy;
