const express = require("express");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const userProfile = require("../model/userProfile");
const dotenv = require("dotenv").config();
const salt = 10;

const register = (req, res, next) => {
  const { username, email, password, createdAccount } = req.body;
  userProfile.findOne({ email }, (err, data) => {
    if (err) next(err);
    if (data) {
      return res.status(200).json({
        message: "Email has been registered,create account!"
      });
    } else {
      bcryptjs.genSalt(10, function(err, salt) {
        bcryptjs.hash(password, salt, (err, hash) => {
          const newuserProfile = new userProfile({
            username,
            password: hash,
            email,
            createdAccount
          });
          newuserProfile.save(err => {
            if (err) {
              return next(err);
            } else {
              return res.status(200).json({
                message: "Account created,login!"
              });
            }
          });
        });
      });
    }
  });
};

//FOR LOGIN
const login = (req, res, next) => {
  const { email, password } = req.body;
  userProfile.findOne({ email }, (err, data) => {
    if (err) {
      next(err);
    }
    if (!data) {
      return res.status(404).json({
        message: "email not found"
      });
    } else {
      bcryptjs.compare(password, data.password, (err, checkedPassword) => {
        if (!checkedPassword) {
          return res.status(404).json({
            message: "Wrong Password"
          });
        } else {
          return res.status(200).json({
            message: "Welcome!"
          });
        }
      });
    }
  });
};

module.exports = {
  register,
  login
};
