const express = require('express');
const mongoose = require('mongoose');

const authenticate = require('./middleware/authenticate')
const User = require('./models/User');
const connectDB = require('./db');
const routes = require('./routes/index');
const app = express();
app.use(express.json());

/**
 * auth routes { login, register}
 * 
 */
app.use(routes);


 /**
  * public route
  */
  app.get('/public', authenticate, (req, res) => {

    return res.status(200).json({message: 'I am from public route'})
  });


  /**
   * private route
   */

  app.get('/private', authenticate, (req, res) => {



    return res.status(200).json({message: 'I am from private route'})
  })





/**
 * Global Error Handler
 */

 app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({message: 'Server Error Occurred'})
 })



/**
 * Connect with MongoDb
 */

connectDB('mongodb://localhost:27017/attendance-db-practice')
.then(() => {
  console.log('Database is connected ')
  app.listen(8000, () => {
    console.log('Server is listening on port 8000');
  })
})
.catch( error=> {
  console.log(error)
})
