// const acceptedclientschema=require('../schema/acceptedclient')
// const jwt = require('jsonwebtoken'); 
// const puppy=async(req,res)=>{
   
// try{

//     const decoded = jwt.verify(req.cookies.authToken, 'your_jwt_secret_key');
//     const fetchdata=await acceptedclientschema.findOne({deliveryId:decoded.userId});

// //console.log(fetchdata);
// if(fetchdata!=null){
    
//     res.send({
//         msg:'exists'
//     })
// }
// else{
//     res.send({
//         msg:'notexist'
//     })
// }

// }catch(e){
// res.send({
//     msg:'token error'
// })
//     console.log(e);
    
// }

// }

// module.exports=puppy;
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'goparcel'
});

const puppy = async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.authToken, 'your_jwt_secret_key');

    // Check if an entry with the specified deliveryId exists
    const [rows] = await pool.execute(
      `SELECT * FROM accepted_clients WHERE deliveryId = ?`, 
      [decoded.userId]
    );

    if (rows.length > 0) {
      res.send({
        msg: 'exists'
      });
    } else {
      res.send({
        msg: 'notexist'
      });
    }
  } catch (e) {
    console.error('Token error:', e);
    res.send({
      msg: 'token error'
    });
  }
};

module.exports = puppy;
