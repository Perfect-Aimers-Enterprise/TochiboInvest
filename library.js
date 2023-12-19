// import nodemailer, { Transporter } from "nodemailer";
require("dotenv").config();
const nodemailer = require("nodemailer");

const Transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  secure: true,
  port: 465,
  auth:{
    user: "melodyozuru087@gmail.com",
    pass: process.env.APP_PASSWORD,
  },
  tls:{
    rejectUnauthorized: false
  }
});

module.exports = Transporter;
