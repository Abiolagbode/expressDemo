const startUpDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const courses = require('./routes/courses');
const home = require('./routes/home');
const config = require('config');
const Joi = require("joi");
const express = require("express");
const app = express();
const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`env: ${app.get('env')}`);

app.set('view engine', 'pug');
app.set('views', './views'); //default
app.use(express.json());
app.use('/api/courses', courses);
app.use('/', home);
//middleware 
app.use(logger);
app.use(helmet());

if(app.get('env') === 'development'){
app.use(morgan('tiny'));
startUpDebugger('Morgan enabled...')
}
dbDebugger('db connecting...')
//Configuration
console.log('Application Name '+config.get('name'));
console.log('Mail Server ' + config.get('mail.host'));
// console.log('Mail Password ' + config.get('mail.password'));

// app.use(function(req, res, next){
//     console.log('Authenticating...');
//     next();
// });




//Environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening to port: "+port));

// validation logic
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
};
