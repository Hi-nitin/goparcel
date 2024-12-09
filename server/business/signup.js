// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const User=require('../schema/signup')
// const signup=async(req,res)=>{

//     try {
//         const { firstname, lastname, email, phone,password ,repassword,guy} = req.body;
    

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
          
//            res.json({ msg: 'Email already exists' });

//         }else{
    
//         // Hash the password
//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(password, saltRounds);
    
//         // Create a new user
//         const newUser = new User({
//           firstName:firstname,
//           lastName:lastname,
//           email:email,
//           phone:phone,
//           password: hashedPassword,
//           guy:guy // Use hashed password
//         });
    
//         // Save the user to the database
//         const savedUser = await newUser.save();
//         res.status(201).json({
//           success:true,
//           msg:'signup'
//         });
//       }
//       } catch (err) {
//         console.error('Error creating user:', err);
//         res.status(400).json({ msg: err.message });
//       }

// }s

// module.exports = signup;
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const dbConfig = {
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: '', // replace with your MySQL password
  database: 'goparcel', // replace with your database name
};

const signup = async (req, res) => {
  const { firstname, lastname, email, phone, password, guy } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    
    // Check if the user already exists
    const [existingUser] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.json({ msg: 'Email already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      phone: phone,
      password: hashedPassword,
      guy: guy,
    };

    // Insert the new user into the database
    await connection.execute('INSERT INTO users (firstName, lastName, email, phone, password, guy) VALUES (?, ?, ?, ?, ?, ?)', 
      [newUser.firstName, newUser.lastName, newUser.email, newUser.phone, newUser.password, newUser.guy]);

    res.status(201).json({
      success: true,
      msg: 'signup',
    });

    await connection.end();
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(400).json({ msg: err.message });
  }
};

module.exports = signup;
