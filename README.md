# backend-testing

A simple Express.js REST API with health check and todos endpoints.

## Features

- Express.js server with proper error handling
- CORS enabled
- Environment variable support with dotenv
- Health check endpoint
- Todo creation endpoint

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```

The server will start on port 3000 (or the PORT specified in your .env file).

## API Endpoints

### GET /api/health

Health check endpoint that returns the server status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-12-07T17:47:46.245Z",
  "uptime": 14
}
```

### POST /api/todos

Create a new todo item.

**Request Body:**
```json
{
  "title": "My Todo",
  "description": "Optional description"
}
```

**Response:**
```json
{
  "id": 1,
  "title": "My Todo",
  "description": "Optional description",
  "completed": false,
  "createdAt": "2025-12-07T17:47:53.397Z"
}
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```
PORT=3000
NODE_ENV=development
```

## Dependencies

- express: ^4.18.2
- cors: ^2.8.5
- dotenv: ^16.3.1