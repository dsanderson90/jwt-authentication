const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const path = require('path');
const dotenv = require('dotenv');
const User = require('./User')
const jwt = require('jsonwebtoken');
const withAuth = require('./middleware')

dotenv.config();

const app = express();
const secret = 'secret'

app.use(bodyParser({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser());

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

app.get('/api/home', (req, res) => {
  res.send('Welcome!')
});

app.get('/api/secret', withAuth, (req, res) => {
  res.send('The password is gumballs')
});

app.get('/api/checkToken', withAuth, (req, res) => {
  res.status(200)
});

app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)
  const user = new User({ email, password });
  user.save((err) => {
    if(err) {
      res.status(500)
        .send('Error registering new user please try again.')
    }
    else {
      res.status(200).send('Welcome aboard!')
    }
  });
})


app.post('/api/authenticate', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if(err) {
      console.error(err);
      res.status(500)
        .json({
          error: 'Internal error, try again'
        });
    }
    else if(!user) {
      res.status(401)
      .json({
        error: 'Incorrect email or password'
      });
    }
    else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
          .json({
            error: 'Internal error 2, try again'
          });
        }
        else if(!same) {
        res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
        }
        else {
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true})
          .sendStatus(200)
        }
      });
    }
  });
});

app.listen(process.env.PORT || 8080, () => console.log('working'))
