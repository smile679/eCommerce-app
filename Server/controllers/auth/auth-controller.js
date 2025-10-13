const  User = require('../../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register
const registerUser =async (req, res)=>{
    const { username, email, password } = req.body;
    // console.log("Incoming request body:", req.body);
  try {
    const checkUser = await User.findOne({ $or: [{username}, {email}] })

    if(checkUser){
      return res.json({
        success : false, 
        message : 'You already have an account!'
      })
    }

    const hashedPassword =await bcrypt.hash(password, 12)

    const newUser =new User({
      username,
      email,
      password : hashedPassword,
    })

   await newUser.save();

    res.status(200).json({
      success : true,
      message : 'user successfully registered!',
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      success : false,
      message : 'something is wrong!'
    })
  }
}
 

//login
const loginUser =async (req, res)=>{
  const { email, password } = req.body;

  try {
      const checkUser = await User.findOne({ email });

      if(!checkUser){
        return res.json({
          success : false,
          message : "user doesn't exists! please register first"
        })
      }

      const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);

      if(!checkPasswordMatch){
        return res.json({
          success : false,
          message : "Incorect password! Please try again"
        })
      }

      const token = jwt.sign({
        id : checkUser._id,
        email : checkUser.email,
        role: checkUser.role,
        username : checkUser.username,
      }, 'CLIENT_SECRET_KEY',{expiresIn : '1000m'})

      res.cookie('token', token, {httpOnly : true, secure : false}).json({
        success : true,
        message : "user successfully logged in",
        user : {
          id : checkUser._id,
          email : checkUser.email,
          role: checkUser.role,
          username : checkUser.username,
        },  
      })

  }catch(error){
    console.log(error);
    res.status(500).json({
      success : false,
      message : 'something is wrong!'
    })
  }
}


//logout

const logoutUser =(req, res)=>{
  res.clearCookie('token').json({
    success : true,
    message : "logged out successfully"
  })
}

//auth midleware

const authMiddleware =async (req, res, next)=>{
  const token = req.cookies.token;

  if(!token){
    return res.status(401).json({
      success : false,
      message : "Unauthorised user!"
    })
  }

  try{
    const decoded = jwt.verify(token,"CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  }catch(error){
    console.log(error);
    res.status(401).json({
      success : false,
      message : "Unauthorised user!"
    })
  }
}


module.exports = {registerUser, loginUser, logoutUser, authMiddleware}