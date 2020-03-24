const express = require('express');
const mongoose = require('mongoose');
const config = require('config');


const breeds = require('./routes/api/breeds');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

const app = express();

app.use('/uploads', express.static('uploads'));
// Bodyparser
app.use(express.json());

// DB Config
const db = config.get('mongoURI');

// Connect to Mongo DB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(()=> console.log('MongoDB Connected'))
    .catch(error => console.log(error));


// Use Routes
app.use('/api/breeds', breeds);
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Backend started at ${port}`));