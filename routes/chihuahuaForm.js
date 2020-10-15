const express = require('express');
const sgMail = require('@sendgrid/mail');
const router = express.Router();
require('dotenv').config();

// console.log("This is the sendgrid api key " + process.env.SEND_GRID_CHI);

router.post('/', async (req, res) => {
    let contact;
       const { name, email, number, location, message, subject } = req.body;
       contact = {
           name,
           number,
           location,
           email,
           message,
           subject
       };
    sgMail.setApiKey(process.env.SEND_GRID_NEW);
    const msg = {
      to: 'info@chihuahuapupps.com',
      from: 'chihuahuapupps.info@gmail.com',
      subject: contact.subject,
      text: 'this is my very simple message',
      html: `<p>${contact.name} <br> ${contact.number} <br/> ${contact.email} <br> ${contact.location} <br> ${contact.message}<p>`
    };
     
    try{
       await sgMail.send(msg);
       console.log('Message sent');
       res.status(201).send('this is the chihuahua route');
    }catch(err){
        console.log(error.response.body)
        console.error(err);
        
    }
     
   
});

router.post('/', async (req, res) => {
    // console.log(req.body);
    // console.log(req.body.data);
    let contact;
       const { name, email, phone, subject, message } = req.body;
       contact = {
           name,
           email,
           phone,
           subject,
           message
       };
   
//    console.log(contact);


   sgMail.setApiKey(process.env.SEND_GRID_CHI);
const msg = {
  to: 'marcsitze01@gmail.com',
  from: 'jorelsitze01@gmail.com',
  subject: 'subjet of marc message',
  text: 'this is my very simple message'
};

sgMail.send(msg).then(() => {
    console.log('Message sent');
    res.status(201).json(msg);
}).catch((error) => {
    console.log(error.response.body)
    // console.log(error.response.body.errors[0].message)
});


    //    try {
    //     //    const newcontact = await contact.save();
    //     sgMail.send(msg);
    //     //  console.log(contact);
    //     console.log('success email sent...');
    //        res.status(201).json(msg);
           
    //    } catch(err) {
    //     console.error(err);
    //     if(err.response) {
    //         console.error(err.response.body);
    //     }
    //        res.status(400).send(err);
           
    //    } 
   });


   module.exports = router;