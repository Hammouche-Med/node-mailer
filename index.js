const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());app.use(bodyParser.urlencoded({ extended: false }));const route = express.Router();
const port = process.env.PORT || 5000;app.use('/v1', route);
app.listen(port, () => {    console.log(`Server listening on port ${port}`);});

require('dotenv').config()

var nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: process.env.EMAIL ,
            pass: process.env.PASSWORD,
         },
    secure: true,
    });

    app.post('/send-mail', (req, res) => {
        const {to, subject, text} = req.body
        const mailData = {
            from : process.env.EMAIL,
            to: to,
            subject: subject,
            text: text,
            html: '<b>IT WORKS</b>'
        }
        transporter.sendMail(mailData, (error, info) =>{
            if (error ) {
                console.log(error);
            }else{
                res.status(200).send({message: 'mail sent', message_id:info.messageId })
            }
        })
      })