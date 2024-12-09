const express = require('express');
const app = express();
const port = 3000; // Choose any port number you prefer
const setupWebSocket=require('./business/socket')
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');
const path = require('path'); // Ensure this line is included
const cors = require('cors');
const router=require('./router/router')
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(bodyParser.json()); // for parsing application/json
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from uploads directory

const MongoDB=require('./database/index')

const Demosocket = require('./business/demosocket');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
MongoDB()

setupWebSocket(server)

// Define a route
app.use('/',router);

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
