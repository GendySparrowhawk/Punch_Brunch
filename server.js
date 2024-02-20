const express = require("express");
require("dotenv").config()
// const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const multer = require("multer");
// const sgMail = require("@sendgrid/mail");
// const upload = multer();
const PORT = process.env.PORT || 3333;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
console.log(process.env.SENDGRID_API_KEY)
// enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.static("./public"));


app.listen(PORT, () => console.log(`server started on ${PORT}`));
