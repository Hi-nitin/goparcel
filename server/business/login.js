// const bcrypt = require('bcrypt');
// const User = require('../schema/signup'); // Adjust the path as necessary
// const jwt = require('jsonwebtoken'); // Optional: If you're using JWT for token management

// // Define a secret for JWT (use environment variable in real apps)
// const JWT_SECRET = 'your_jwt_secret_key';

// const Login = async (req, res) => {
//   const { email, password } = req.body;
// console.log(req.cookies);
//   try {
//     // Check if the user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: 'Email not found' });
//     }

//     // Compare the provided password with the stored hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid password' });
//     }

//     // Generate a token (Optional: if using JWT)
//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

//     // Set a cookie with the token
//     res.cookie('authToken', token, {
//       httpOnly: true,
//       secure: false, // Set to true only when using HTTPS
//       maxAge: 3600000 // 1 hour
//     });

//     // Return a success message
//     res.json({ message: 'Login successful' });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ error: 'Failed to login' });
//   }
// };

// module.exports = Login;

const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken'); 
const JWT_SECRET = 'your_jwt_secret_key';
const dbConfig = {
  host: 'localhost',
  user: 'root', 
  password: '',
  database: 'goparcel', 
};
const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) {
      return res.status(400).json({ error: 'Email not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000
    });
    res.json({ message: 'Login successful' });
await connection.end();
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
};

module.exports = Login;
