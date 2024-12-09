// const mongoose = require('mongoose');

// // Replace the following with your MongoDB connection string
// const mongoURI = 'mongodb://localhost:27017/goparcel';

// const MongoDB=()=>{
// // Connect to MongoDB
// mongoose.connect(mongoURI, {

// });

// // Get the connection object
// const db = mongoose.connection;

// // Handle connection errors
// db.on('error', console.error.bind(console, 'Connection error:'));

// // Handle successful connection
// db.once('open', () => {
//   console.log('Connected successfully to MongoDB');
// });


// }

// module.exports=MongoDB;

const mysql = require('mysql2');

// Replace the following with your MySQL connection details
const dbConfig = {
  host: 'localhost',
  user: 'root', // replace with your MySQL username
  password: '', // replace with your MySQL password
  database: 'goparcel', // replace with your database name
};

const MySQLDB = () => {
  // Create a connection to the MySQL database
  const connection = mysql.createConnection(dbConfig);

  // Connect to the database
  connection.connect((err) => {
    if (err) {
      console.error('Connection error:', err.stack);
      return;
    }
    console.log('Connected successfully to MySQL');
  });

  // Optionally handle connection end
  connection.on('end', () => {
    console.log('MySQL connection closed');
  });
};

module.exports = MySQLDB;
