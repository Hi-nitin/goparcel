// const User=require('../schema/signup')
// const tokendecoder=async(req,res)=>{
// let _id=req.body.decoded.userId;


//     try {
//         const user = await User.findOne({ _id });
//         if (user) {
//           res.json(user);
//           console.log(user);
          
//         } else {
//             console.log('k');
            
//           res.status(404).json({ message: 'User not found' });
//         }
//       } catch (error) {
//         console.error('Error fetching user:', error);
//         res.status(500).json({ message: 'Internal server error' });
//       }
// }

// module.exports=tokendecoder;
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: '', // replace with your MySQL password
  database: 'goparcel', // replace with your database name
};

const tokendecoder = async (req, res) => {
  let userId = req.body.decoded.userId;

  try {
    const connection = await mysql.createConnection(dbConfig);
    
    // Fetch the user based on userId
    const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [userId]);
    const user = rows[0];

    if (user) {
      res.json(user);
      console.log(user);
    } else {
      console.log('User not found');
      res.status(404).json({ message: 'User not found' });
    }

    await connection.end();
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = tokendecoder;
