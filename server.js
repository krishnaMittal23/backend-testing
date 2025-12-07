require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Store the start time for uptime calculation
const startTime = Date.now();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory storage for todos (for development/testing purposes only)
// Note: Data will be lost when the server restarts
let todos = [];
let todoIdCounter = 1;

// GET /api/health - Health check endpoint
app.get('/api/health', (req, res) => {
  const currentTime = Date.now();
  const uptimeInSeconds = Math.floor((currentTime - startTime) / 1000);
  
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: uptimeInSeconds
  });
});

// POST /api/todos - Create new todo
app.post('/api/todos', (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({
        error: 'Title is required'
      });
    }
    
    const newTodo = {
      id: todoIdCounter++,
      title,
      description: description || '',
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    todos.push(newTodo);
    
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/api/health`);
});

module.exports = app;
