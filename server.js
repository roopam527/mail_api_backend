
'use strict';
const nodemailer = require('nodemailer');
const express = require('express')
const cors = require('cors');
const app = express()
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({
    extended:false//if we set true there it means to parse data with some automatically generated extra content in it
 }));
 app.use(bodyParser.json());

app.post('/', (req, res) =>{
    
       let content = {
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            message:req.body.message
        }


    
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
       service:'gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user:"roopamg777@gmail.com", // generated ethereal user
            pass: "roopam@527" // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: "roopamg777@gmail.com", // sender address
        to: 'armaanharsh@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: JSON.stringify(content), // plain text body
      //  html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log("err=====" +error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});
    

    res.send(content)

} )
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('Example app listening on port 3000!'))
