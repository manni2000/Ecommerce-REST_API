const router = require("express").Router();
const User = require("../models/User");
// const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
    });
    const savedUser = await newUser.save(); // for saved
    res.send(savedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});


//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
     //console.log(user);
    if(!user) return res.status(401).json("Wrong credentials!");
  
    
     if(user.password !== req.body.password) 
       return res.status(401).json("Wrong credentials!");

       const accessToken = jwt.sign(
        {
        id : user._id, 
        isAdmin: user.isAdmin,
       }, 
       process.env.JWT_SEC,
        { expiresIn: "3d"}
       );
    
       const { password, ...others } = user._doc;

    res.status(200).json({...others, accessToken});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
