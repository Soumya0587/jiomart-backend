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

module.exports = {
  UserRouter,
};
