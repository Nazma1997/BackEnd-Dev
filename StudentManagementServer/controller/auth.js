const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const loginController = async(req, res, next) => {

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
};


const registerController =  async(req, res, next) => {
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
 };


 module.exports ={
  loginController,
  registerController
 }