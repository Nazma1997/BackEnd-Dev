const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('./middleware/authenticate')
const User = require('./models/User');
const connectDB = require('./db');

const app = express();
app.use(express.json());

/**
 * Register a User
 */

 app.post('/register', async(req, res, next) => {
  try{
       const {name, email, password} = req.body;
       if(!name || !email || !password){
        return res.status(400).json({message: 'Invalid Data'})
       }
      
       let user = await User.findOne({email});
       if(user){
        return res.status(400).json({message: 'User Already Exists'});
       }

       user = new User({name, email, password});

       const salt = await bcrypt.genSalt(10);
       const hash = await bcrypt.hash(password, salt);
       user.password = hash;
       await user.save();

       return res.status(201).json({message: 'User Created Successfully', user})
  
  }catch(e){
    next(e)
  }
 });

 /**
  * Login A user
  */

 app.post('/login', async(req, res, next) => {

   const {email, password} = req.body;
   try{

       const user = await User.findOne({email});
       if(!user){
        return res.status(400).json({message: 'Invalid Credential'})
       }

       const isMatch = await bcrypt.compare(password, user.password);

       if(!isMatch){
        return res.status(400).json({message: 'invalid Credential'});

       }

       delete user._doc.password;

       token = jwt.sign(user._doc, 'secret-key', {expiresIn: '2h'})
       return res.status(200).json({message: 'Login Successfully', token})
   }catch(e){
    next(e)
   }
 });


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
