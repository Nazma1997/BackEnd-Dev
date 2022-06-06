require('dotenv').config('../.env');
const express = require('express');
const {errorHandler, notFoundHandler} = require('./error')

const app = express();

const myDb = require('../db/db');
const myDB = require('../db/db');
myDb.create('user 1', 10);
myDb.create('user 2', 10);
myDb.create('user 3', 10);
myDb.create('user 4', 10);

const bulk = myDB.bulkCreate('user 6', 10, 3);
console.log( 'bulk',bulk)

const tickets = myDB.find();
 console.log("All tickets", tickets);
 const winners = myDB.draw(2);
 console.log('winners', winners);


// middleware 
app.use(require('./middleware'));

// router 
app.use(require('./route'));
app.use(notFoundHandler);
app.use(errorHandler);






module.exports = app;