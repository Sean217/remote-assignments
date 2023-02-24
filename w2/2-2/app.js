import dotenv from "dotenv-defaults";
dotenv.config();
import express from 'express'
import cors from 'cors'
import routes from './routes/healthcheck.js'

var app = express();
const port = process.env.PORT || 3000

// view engine setup
/* app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); */

//app.use(logger('dev'));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(express.json())
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})

app.use('/', routes);

// catch 404 and forward to error handler
/* app.use(function(req, res, next) {
  next(createError(404));
}); */

// error handler
/* app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}); */



app.listen(port, () => {
  	console.log(`Server is up on port ${port}.`)
})
