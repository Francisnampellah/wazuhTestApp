const fs = require('fs');
const path = require('path');

const logPath = process.env.LOG_PATH || path.join(__dirname, 'logs', 'app.log');
const logDir = path.dirname(logPath);

// Ensure log directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

function writeLog() {
  const timestamp = new Date().toISOString();
  const message = `[${timestamp}] Application log message\n`;
  fs.appendFile(logPath, message, err => {
    if (err) {
      console.error('Failed to write log:', err);
    }
  });
}

// Write a log every 5 seconds
setInterval(writeLog, 5000);

// Write one immediately on start
writeLog(); 