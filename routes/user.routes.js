const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

const saltRounds = 5;

const UserRouter = express.Router();

UserRouter.post("/register", async (req, res) => {
  const { password, email } = req.body;
  try {
    let data = await UserModel.find({ email });
    if (data.length) {
      return res.status(400).send("User Already Registered");
    }
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        return res.status(400).send(err.message);
      }
      let newUser = new UserModel({ ...req.body, password: hash });
      await newUser.save();
    });

    res.status(200).send("New User has been registered");
  } catch (error) {
    res.send(error.message);
  }
});

UserRouter.post("/login",async(req,res)=>{
  const { email, password } = req.body;

  let user = await UserModel.find({ email: email });

  if (user.length == 0) {
    return res.status(404).send("User not register");
  }

  let hash = user[0].password;

  //Comparing hash password with the entered one
  bcrypt.compare(password, hash, function (err, result) {
    if(err){
      return res.json({msg:err.message})
    }

    if (result) {
      return res.json({
        user:{
            name:user[0].name,
            email:user[0].email,
           gender:user[0].gender,
           role:user[0]?.role,
           userId:user[0]?._id,
           token: jwt.sign({ userId: user[0]._id }, "soumalya")
        }
        ,
      });
    }
    return res.status(404).send("Incorrect password ");
  });
})

UserRouter.get("/all",async(req,res)=>{
  try{
    const data = await UserModel.find({role:"customer"})
    res.send(data)
  }
  catch(e){
    console.log(e);
  }
})

module.exports = {
  UserRouter,
};
