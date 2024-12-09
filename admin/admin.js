// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: '', // replace with your MySQL password
    database: 'goparcel'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Routes

// Get all users
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
});

// Update a user
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone } = req.body;

    db.query(
        'UPDATE users SET firstName = ?, lastName = ?, email = ?, phone = ? WHERE id = ?',
        [firstName, lastName, email, phone, id],
        (err, results) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            res.json({ id, firstName, lastName, email, phone });
        }
    );
});

// Delete a user
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json({ message: 'User deleted' });
    });
});

// Get all documents
app.get('/api/documents', (req, res) => {
    db.query('SELECT * FROM document_uploads', (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
});

app.put('/api/users/verify/:id', (req, res) => {
  const { id } = req.params;

  db.query(
      'UPDATE users SET verify = 1 WHERE id = ?',
      [id],
      (err, results) => {
          if (err) {
              return res.status(400).json({ message: err.message });
          }
          res.json({ message: 'User verified' });
          db.query('DELETE FROM document_uploads WHERE delivery_id = ?',
             [id], (err) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
        });
      }
  );
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
