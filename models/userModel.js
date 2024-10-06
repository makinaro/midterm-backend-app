const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');

// Retrieves users from JSON and returns parsed users
const getUsers = () => {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf-8');

        // Handle empty or invalid JSON
        if (!data) {
            return [];
        }

        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading users.json:', err);
        return [];
    }
};

// Updates JSON to add new user created
const saveUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

module.exports = { getUsers, saveUsers };