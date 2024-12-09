// const acceptedclientSchema=require('../schema/acceptedclient')
// const jwt = require('jsonwebtoken');

// const underservice=async(req,res)=>{


// try{
//     const token = req.cookies.authToken;
//     const decoded = jwt.decode(token);

//     try{
// const getdetail=await acceptedclientSchema.findOne({deliveryId:decoded.userId}).populate('customerId');
// console.log(getdetail);
// res.send({
//     msg:getdetail
// })
//     }catch(ex){
//         res.send({
//             msg:'error fetching'
//         })
//     }
    
// }catch(e){
// res.send({
//     msg:'cookie or token error'
// })
// }
// }
// module.exports=underservice

const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'goparcel'
});

const underservice = async (req, res) => {
  try {
    const token = req.cookies.authToken;
    const decoded = jwt.decode(token);

    try {
      const [rows] = await pool.execute(
        `SELECT ac.*, u.firstName, u.lastName,u.email,u.phone
         FROM accepted_clients ac
         JOIN users u ON ac.customerId = u.id
         WHERE ac.deliveryId = ?`, [decoded.userId]
      );
      console.log('below');
      
console.log(rows[0]);

      if (rows.length > 0) {
        res.send({
          msg: rows[0] // Send the first row, if any
        });
      } else {
        res.send({
          msg: 'No details found for this delivery ID.'
        });
      }
    } catch (ex) {
      console.error('Error fetching details:', ex);
      res.send({
        msg: 'Error fetching'
      });
    }
  } catch (e) {
    console.error('Cookie or token error:', e);
    res.send({
      msg: 'Cookie or token error'
    });
  }
};

module.exports = underservice;
