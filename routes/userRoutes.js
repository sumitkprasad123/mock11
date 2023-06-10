const express = require("express")
const userRouter = express.Router()
const {UserModel} = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


// reqisteration 
userRouter.post("/register",async(req,res) => {
    const {name,email,password} = req.body
    try{
        console.log(name)
        bcrypt.hash(password, 5, async(err,hash) => {
          const user = new UserModel({name,email,password:hash})
          await user.save()
          res.status(200).send({"msg":"Registration successfull"})
        });

    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})

// login 
userRouter.post("/login",async(req,res) => {
    const {email,password} = req.body
    try{
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result) => {
                if(result){
                    res.status(200).send({"msg":"Login successfull","token":jwt.sign({ "userID":user._id }, 'masai')})
                }else{
                    res.status(200).send({"msg":"wrong Crendential"})
                }
            });
          }
    }catch(err){
        res.status(400).send({"msg":err.message})
    }
})


module.exports = {
    userRouter
}