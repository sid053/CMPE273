var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var expressSession = require('express-session');
var expressValidator = require('express-validator');


var index = require('./routes/index');
var fileUpload = require('./routes/fileUpload');
var users = require('./routes/users');


var app = express();

//Enable CORS
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('foo'));
app.use(expressSession({
  cookieName: 'session',
  secret: 'foo',
  resave:false,
  duration: 50 * 60 * 1000,
  activeDuration: 30 * 60 * 1000,
  ephemeral: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/files', fileUpload);
app.use('/users', users);

app.use('./public/uploads', express.static(path.join(__dirname, 'uploads')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);
    // render the error page
    res.status(err.status || 500);
});

module.exports = app;
