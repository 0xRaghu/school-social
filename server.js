const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB COnfig
const db =  require('./config/keys').mongoURI;

//Connect to MongoDB using Mongoose
mongoose
  .connect(db)
  .then(()=> console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport.js')(passport);

//Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.get('*',function (req, res) {
        res.redirect('/');
    });

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(__dirname+ '/client/build'));

  app.get('/', (req, res) => {
    res.sendFile(__dirname+ '/client/build/index.html');
  });
}

const port = process.env.PORT;
const ip = process.env.IP;

app.listen(port,ip);

