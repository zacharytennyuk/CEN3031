require('dotenv').config();

// Mongo
const mongoose = require('mongoose');

const Friend = require('./models/Friends');

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

// CORS
const cors = require('cors');
// Express
const express = require('express');

// Routes
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const friendRoutes = require('./routes/friendRoutes');
const chatRoutes = require('./routes/chatRoutes');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/chats', chatRoutes);


const port = 5200;

app.listen(port, () => console.log('Server running on port', port))