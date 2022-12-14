const express = require('express')
const logger = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config()

const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(logger('dev')); // log requests to the console

// Parse incoming requests data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/users', userRoutes)
app.use('/api/chat', chatRoutes)

app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the default API route',
}))

app.listen(PORT, console.log(`Server listening on port ${PORT}`))