require('dotenv').config('../.env');
const express = require('express');
const {errorHandler, notFoundHandler} = require('./error')

const app = express();


// middleware 
app.use(require('./middleware'));

// router 
app.use(require('./route'));
app.use(notFoundHandler);
app.use(errorHandler);






module.exports = app;