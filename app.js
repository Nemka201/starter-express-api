const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index.js');
const resendRouter = require('./routes/resend.js');
const port = 3030;
const app = express();
const cors = require('cors');
var corsOptions = {
  origin: 'https://paveco.com.ar',
  optionsSuccessStatus: 200
}
var corsOptions2 = {
  origin: 'https://paveco-2023.web.app',
  optionsSuccessStatus: 200
}

app.listen(port, () => {
  console.log(`Servidor Express iniciado en el puerto ${port}`);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.use(cors(corsOptions));
app.use(cors(corsOptions2));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/resend', resendRouter);


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
