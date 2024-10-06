const jwt = require('jsonwebtoken');

// Logging middleware
const logger = (req, res, next) => {
    console.log(`${req.method} request for '${req.url}' - ${new Date().toISOString()}`);
    next();
};

// Authentication
const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied, token missing' });

    try {
        const decoded = jwt.verify(token, 'secretKey');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

module.exports = { logger, authenticate };