const logger = require('./logger');
const os = require('os');

// Simulate different types of events
const eventTypes = {
    AUTH: 'authentication',
    SYSTEM: 'system',
    SECURITY: 'security',
    NETWORK: 'network'
};

// Simulate different user activities
const userActivities = [
    'login attempt',
    'file access',
    'configuration change',
    'permission modification',
    'system command execution'
];

// Simulate different security events
const securityEvents = [
    'failed authentication',
    'suspicious IP detected',
    'unusual file access pattern',
    'multiple failed login attempts',
    'unauthorized access attempt'
];

// Simulate different system events
const systemEvents = [
    'high CPU usage',
    'low memory warning',
    'disk space alert',
    'service restart',
    'process termination'
];

// Simulate different network events
const networkEvents = [
    'new connection established',
    'connection timeout',
    'port scan detected',
    'unusual traffic pattern',
    'DNS query'
];

function getRandomIP() {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}

function getRandomUser() {
    const users = ['admin', 'user1', 'system', 'guest', 'service'];
    return users[Math.floor(Math.random() * users.length)];
}

function generateLog() {
    const timestamp = new Date().toISOString();
    const eventType = Object.values(eventTypes)[Math.floor(Math.random() * Object.values(eventTypes).length)];
    const sourceIP = getRandomIP();
    const user = getRandomUser();
    
    let message;
    let logLevel;
    let keywordPrefix = '';

    switch(eventType) {
        case eventTypes.AUTH:
            message = `${userActivities[Math.floor(Math.random() * userActivities.length)]} by user ${user} from ${sourceIP}`;
            logLevel = Math.random() > 0.8 ? 'error' : 'info';
            keywordPrefix = logLevel === 'error' ? '[FAILED LOGIN]' : '[LOGIN]';
            break;
        case eventTypes.SECURITY:
            message = `${securityEvents[Math.floor(Math.random() * securityEvents.length)]} from ${sourceIP}`;
            logLevel = 'warn';
            keywordPrefix = '[SECURITY WARNING]';
            break;
        case eventTypes.SYSTEM:
            message = `${systemEvents[Math.floor(Math.random() * systemEvents.length)]} on ${os.hostname()}`;
            logLevel = Math.random() > 0.9 ? 'error' : 'info';
            keywordPrefix = logLevel === 'error' ? '[SYSTEM ERROR]' : '[SYSTEM INFO]';
            break;
        case eventTypes.NETWORK:
            message = `${networkEvents[Math.floor(Math.random() * networkEvents.length)]} from ${sourceIP}`;
            logLevel = Math.random() > 0.7 ? 'warn' : 'info';
            keywordPrefix = logLevel === 'warn' ? '[NETWORK WARNING]' : '[NETWORK INFO]';
            break;
    }

    // Log plain text in syslog format (no JSON)
    switch(logLevel) {
        case 'error':
            logger.error(`${keywordPrefix} ${message}`);
            break;
        case 'warn':
            logger.warn(`${keywordPrefix} ${message}`);
            break;
        default:
            logger.info(`${keywordPrefix} ${message}`);
    }
}

let logInterval;

// Generate logs every 2-5 seconds
function startLogGeneration() {
    if (logInterval) {
        clearTimeout(logInterval);
    }

    const generateRandomInterval = () => Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds
    
    function scheduleNextLog() {
        logInterval = setTimeout(() => {
            generateLog();
            scheduleNextLog();
        }, generateRandomInterval());
    }

    scheduleNextLog();
}

function stopLogGeneration() {
    if (logInterval) {
        clearTimeout(logInterval);
        logInterval = null;
    }
}

module.exports = {
    startLogGeneration,
    stopLogGeneration
}; 