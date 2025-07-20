const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const POEMS_FILE = path.join(__dirname, 'poems.json');
const USERS_FILE = path.join(__dirname, 'users.json');

app.use(cors());
app.use(express.json());
console.log('Backend running in:', __dirname);

// Signup endpoint
app.post('/api/signup', (req, res) => {
  const { firstName, lastName, contactNo, username, password, role } = req.body;
  if (!firstName || !lastName || !contactNo || !username || !password || !role) {
    return res.status(400).json({ error: "All fields are required." });
  }
  fs.readFile(USERS_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: "Could not read users file" });
    let users;
    try {
      users = JSON.parse(data);
      if (!Array.isArray(users)) users = [];
    } catch {
      return res.status(500).json({ error: "Invalid users file format" });
    }
    if (users.find(u => u.username === username)) {
      return res.status(400).json({ error: "Username already exists" });
    }
    users.push({ firstName, lastName, contactNo, username, password, role });
    fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), err => {
      if (err) return res.status(500).json({ error: "Could not save user" });
      res.status(201).json({ message: "Signup successful" });
    });
  });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }
  fs.readFile(USERS_FILE, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Could not read users file" });
    }
    let users;
    try {
      users = JSON.parse(data);
      if (!Array.isArray(users)) users = [];
    } catch {
      return res.status(500).json({ error: "Invalid users file format" });
    }
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      res.json({ username: user.username, role: user.role });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });
});

// Get all poems
app.get('/api/poems', (req, res) => {
  fs.readFile(POEMS_FILE, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Could not read poems file' });
    }
    try {
      const poems = JSON.parse(data);
      res.json(poems);
    } catch {
      res.status(500).json({ error: 'Invalid poems file format' });
    }
  });
});

// Add a new poem
app.post('/api/addpoem', (req, res) => {
  const { title, body, image } = req.body;
  if (!title || !body) {
    return res.status(400).json({ error: "Title and body are required." });
  }
  fs.readFile(POEMS_FILE, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Could not read poems file' });
    }
    let poems;
    try {
      poems = JSON.parse(data);
      if (!Array.isArray(poems)) poems = [];
    } catch {
      return res.status(500).json({ error: 'Invalid poems file format' });
    }
    poems.push({ title, body, image });
    fs.writeFile(POEMS_FILE, JSON.stringify(poems, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Could not save new poem' });
      }
      res.status(201).json({ message: 'Poem added successfully' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});