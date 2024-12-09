// // app.js (continued)
// const acceptedclientschema = require('../schema/acceptedclient');
// const jwt = require('jsonwebtoken'); // Optional: If you're using JWT for token management

// async function saveacceptedclient(req, res) {

//   try {
//     try {

//       const decoded = jwt.verify(req.cookies.authToken, 'your_jwt_secret_key');
//       const check = await acceptedclientschema.find({ deliveryId: decoded.userId });
//       console.log(check.length);
//       if (check.length == 0) {
//         const delivery = new acceptedclientschema({
//           deliveryId: decoded.userId,
//           parceldescription:req.body.des,
//           customerId: req.body.customerId
//         });
//         const result = await delivery.save();
//         console.log('Delivery saved:', result);
//         res.send({
//           msg: 'success'
//         })
//         console.log('success');

//       } else {
//         res.send({
//           msg: 'under service'
//         })
//         console.log('under service');

//       }




//     } catch (error) {
//       res.status(401).send('Invalid token');
//       console.log('cookie error' + error);

//     }

//   } catch (error) {
//     res.send({
//       msg: 'error accepting customer'
//     })
//     console.log('Error saving delivery:', error);

//   }
// }

// module.exports = saveacceptedclient;
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken'); // Optional: If you're using JWT for token management

const dbConfig = {
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: '', // replace with your MySQL password
  database: 'goparcel', // replace with your database name
};

async function saveacceptedclient(req, res) {
  try {
    const decoded = jwt.verify(req.cookies.authToken, 'your_jwt_secret_key');
    const userId = decoded.userId;
    
    const connection = await mysql.createConnection(dbConfig);
    
    // Check if there's an existing delivery entry for the user
    const [check] = await connection.execute('SELECT * FROM accepted_clients WHERE deliveryId = ?', [userId]);

    if (check.length === 0) {
      // If no existing entry, insert a new accepted client
      const { des: parceldescription, customerId } = req.body;

      await connection.execute(
        'INSERT INTO accepted_clients (deliveryId, parceldescription, customerId) VALUES (?, ?, ?)',
        [userId, parceldescription, customerId]
      );

      console.log('Delivery saved');
      res.send({ msg: 'success' });
    } else {
      res.send({ msg: 'under service' });
      console.log('under service');
    }

    await connection.end();
  } catch (error) {
    if (error.message === 'jwt malformed') {
      res.status(401).send('Invalid token');
      console.log('cookie error: ' + error);
    } else {
      res.send({ msg: 'error accepting customer' });
      console.log('Error saving delivery:', error);
    }
  }
}

module.exports = saveacceptedclient;
