const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

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
  try{
   const users =  await User.find();
    res.status(200).json(users);
  }catch(err){
    res.status(500).json(err);
  }
})

module.exports = router;