const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const { logger } = require('./middleware/authMiddleware');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(logger);

app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});