const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const mongo_uri = process.env.MONGODB_URI;

mongoose.connect(mongo_uri, { useUnifiedTopology: true, useNewUrlParser: true}, function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', (req, res) => {
  return res.send('pong')
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.listen(process.env.PORT || 8080, () => console.log('working'))
