const User = require("../models/User.js");

const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();


//Update
router.put("/:id", verifyTokenAndAuthorization,async (req,res)=>{
    if(req.body.password){
        req.body.password = req.body.password,
            process.env.PASS_SEC;
    }
 try{
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id, 
        {
          $set: req.body,
        },
        {  new: true }
    );
    res.status(200).json(updatedUser);
  } catch(err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async(req,res)=>{
  try{
    await User.findByIdAndUpdate(req.params.id)
    res.status(200).json("User has been deleted...")
  }catch(err){
    res.status(500).json(err)
  }
})

//GET ALL USER
router.get("/", verifyTokenAndAdmin, async (req,res)=>{
  const query = req.query.new;
  try{
   const users = query ?
      await User.find().sort({ _id: -1}).limit(2)
    : await User.find();
   // console.log(users);
    res.status(200).json(users);
  }catch(err){
    res.status(500).json(err);
  }
})

// GET User Stats
router.get("/stats", verifyTokenAndAdmin, async (req, res)=>{
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear()-1));

  try{
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { 
        $project: {
          month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
    ]);
    res.status(200).json(data)
    //console.log(data)
  } catch(err){
    res.status(500).json(err);
  } 
});

module.exports = router;