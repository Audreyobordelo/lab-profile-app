require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

const session    = require("express-session");
const MongoStore = require('connect-mongo')(session);

const app_name = require('./package.json').name; 

mongoose
  .connect((process.env.MONGODB_URI ||`mongodb://localhost/${app_name}`), {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name
    : "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const cors = require('cors');
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000']
}));

// Enable authentication using session + passport
app.use(session({
  secret: `${app_name}-shhhhhhht`,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}))
require('./passport')(app);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const lotUsers = require('./routes/Lot-users');
app.use('/', lotUsers);

const lotProducts = require('./routes/Lot-products');
app.use('/', lotProducts);

//
// After routes: static server || React SPA
//

app.use(express.static(path.join(__dirname, 'client/build')));

// route not-found => could be a React route => render the SPA
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function (err) {
    if (err) {
      next(err)
    }
  })
});

// catch 404
// app.use((req, res, next) => {
//   console.log('404')
//   const err = new Error()
//   err.status = 404;

//   next(err);
// });

app.use((err, req, res, next) => {
  function er2JSON(er) {
    // http://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify#18391212
    var o = {};
  
    Object.getOwnPropertyNames(er).forEach(function (key) {
      o[key] = er[key];
    });
  
    return o;
  }

  // always log the error
  console.error('ERROR', req.method, req.path, err);

  err = er2JSON(err);
  err.status || (err.status = 500); // default to 500
  res.status(err.status);

  res.json(err);
});

app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/index.html");
});

module.exports = app;
