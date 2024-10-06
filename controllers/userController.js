const { getUsers, saveUsers } = require('../models/userModel');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// Register a new user
const register = (req, res) => {
    const users = getUsers();

    // Valid input parameters
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    //  Input validator
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    //  To prevent duplicate users
    const userExists = users.find(user => user.email === req.body.email);
    if (userExists) return res.status(400).json({ error: 'User already exists.' });

    // Creates new user
    const newUser = {
        id: users.length + 1,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    users.push(newUser);
    saveUsers(users);

    res.status(201).json({ message: 'User registered successfully.' });
};

// Login user and generate token
const login = (req, res) => {
    const users = getUsers();
    const { email, password } = req.body;

    // Find the user by email and password
    const valid = users.find(u => u.email === email && u.password === password);
    if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

    // Generate a JWT token
    const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1h' });

    res.status(200).json({ token });
};

// Get profile of the authenticated user
const profile = (req, res) => {
    const users = getUsers();
    const found = users.find(u => u.id === req.user.id);
    if (!found) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ id: user.id, username: user.username, email: user.email });
};

module.exports = { register, login, profile };