var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Sequelize = require('sequelize');

var app = express();



//Mysql Setup
var sequelize = new Sequelize('nodejs', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 32,
    min: 0,
    idle: 10000
  },
  additional: {
    timestamps: false
    // ..
  }

});

sequelize
  .authenticate()
  .then(function (err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });


// auto generated models
const models = require('sequelize-auto-import')(sequelize, './models', {
  schemas: ['nodejs']
});
// export all the models for your convenience
module.exports.dbModel = models;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//REST API's
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users')(models);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
