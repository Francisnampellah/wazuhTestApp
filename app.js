const express = require('express');
const logger = require('./logger');
const logGenerator = require('./logGenerator');

const app = express();
const PORT = 3030;

app.use(express.json());

// Store log generation state
let isLogGenerationActive = true;

app.get('/', (req, res) => {
  logger.info('Accessed root path');
  res.send('Hello from the Node.js app');
});

app.post('/login', (req, res) => {
  const { username } = req.body;
  logger.info(`Login attempt by user: ${username}`);
  res.send(`Login received for ${username}`);
});

app.get('/error', (req, res) => {
  logger.error('Simulated error occurred');
  res.status(500).send('Something broke!');
});

// New endpoint to control log generation
app.post('/logs/control', (req, res) => {
  const { action } = req.body;
  
  if (action === 'start' && !isLogGenerationActive) {
    isLogGenerationActive = true;
    logGenerator.startLogGeneration();
    logger.info('Log generation started');
    res.send('Log generation started');
  } else if (action === 'stop' && isLogGenerationActive) {
    isLogGenerationActive = false;
    logger.info('Log generation stopped');
    res.send('Log generation stopped');
  } else {
    res.status(400).send('Invalid action or log generation already in requested state');
  }
});

app.listen(PORT, () => {
  logger.info(`App started on port ${PORT}`);
  console.log(`Server listening on http://localhost:${PORT}`);
}); 