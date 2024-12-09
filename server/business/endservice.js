// const acceptedclientschema=require('../schema/acceptedclient')
// const jwt = require('jsonwebtoken'); 
// const endservice=async(req,res)=>{

//     try{

//         const decoded = jwt.verify(req.cookies.authToken, 'your_jwt_secret_key');
//         const fetchdata=await acceptedclientschema.deleteOne({deliveryId:decoded.userId});
    
//     console.log(fetchdata);
//     if(fetchdata.deletedCount==1){
        
//         res.send({
//             msg:'deleted'
//         })
//     }
//     else{
//         res.send({
//             msg:'nodelete'
//         })
//     }
    
//     }catch(e){
//     res.send({
//         msg:'token error'
//     })
//         console.log(e);
        
//     }
// }
// module.exports=endservice;
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken'); 

const dbConfig = {
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: '', // replace with your MySQL password
  database: 'goparcel', // replace with your database name
};

const endservice = async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.authToken, 'your_jwt_secret_key');
    const userId = decoded.userId;

    const connection = await mysql.createConnection(dbConfig);

    // Delete the entry based on deliveryId
    const [result] = await connection.execute('DELETE FROM accepted_clients WHERE deliveryId = ?', [userId]);

    console.log(result);
    
    if (result.affectedRows === 1) {
      res.send({
        msg: 'deleted'
      });
    } else {
      res.send({
        msg: 'no delete'
      });
    }

    await connection.end();
  } catch (e) {
    res.send({
      msg: 'token error'
    });
    console.log(e);
  }
};

module.exports = endservice;
