const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB COnfig
const db =  require('./config/keys').mongoURI;

const cors = require('cors');

//app.use(cors());

app.use(cors({
  origin: 'https://schoolsocial-raghu19.c9users.io:8081',
  credentials: true
}));

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
app.use('/api/profiles', profile);
app.use('/api/posts', posts);

const port = process.env.PORT;
const ip = process.env.IP;

app.listen(port,ip);