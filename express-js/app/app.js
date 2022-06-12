require('dotenv').config('../.env');
const express = require('express');
const {errorHandler, notFoundHandler} = require('./error')

const app = express();

const myDB = require('../db/db');

console.log(myDB.bulkCreate('Nazma', 10, 5))
// middleware 
app.use(require('./middleware'));
app.use(require('./route'));
app.use(notFoundHandler);
app.use(errorHandler);






module.exports = app;