const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const PORT = process.env.PORT || 3333;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());

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

app.post("/send-email", upload.none(), (req, res) => {
  //   console.log(req);
  const { name, email, plusOne, notes } = req.body;
  //   console.log(req.body);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jacob.hoefer@gmail.com",
      pass: "vobr qfxu gbpm ltlp",
    },
  });

  let mailOptions = {
    from: "jacob.hoefer@gmail.com",
    to: "jacob.hoefer@gmail.com",
    subject: "New RSVP",
    text: `
    Name: ${name}
    Emial: ${email}
    Plus One: ${plusOne}
    Notes: ${notes}
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Email did not send", err);
      res.status(500).send("error in sedning email");
    } else {
      console.log("Emial sent: ", info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.listen(PORT, () => console.log(`server started on ${PORT}`));
