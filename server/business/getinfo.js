// const User=require('../schema/signup')
// const getinfo= async (req, res) => {
//     try {
//       const userId = req.params.userId;
     
//       const user = await User.findById(userId); // Fetch user by ID
  
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       res.json(user);
//     } catch (err) {
//       res.status(500).json({ message: 'Error fetching user details', error: err });
//     }
//   }

//   module.exports=getinfo
const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: '', // Your MySQL password (empty in this case)
  database: 'goparcel', // Your database name
};

const getinfo = async (req, res) => {
  try {
    const userId = req.params.userId;

    const connection = await mysql.createConnection(dbConfig);
    
    // Fetch user by ID
    const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [userId]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
    await connection.end();
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user details', error: err });
  }
};

module.exports = getinfo;
