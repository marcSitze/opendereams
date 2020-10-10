const express = require('express');
const sgMail = require('@sendgrid/mail');
const router = express.Router();
// require('dotenv').config();
// console.log(process.env.SEND_GRID_API_KEY);

// Display the summer page
router.get('/', (req, res) => {
    res.render('pages/summer'); 
});

// Render welcome page
router.get('/welcome', (req, res) => { 
    res.render('pages/welcome'); 
});

// Send the application form to the provided email
router.post('/', (req, res) => {
    const {
        name1,
        name2,
        email,
        address1,
        address2,
        city,
        region,
        code,
        area,
        phone,
        question1,
        question2,
        series,
        question3,
        question4,
        question5,
        question6,
        question7,
        question8,
        question9,
        question10,
        message1,
        message2,
        message3,
        message4,
        message5
    } = req.body;
    let form;

    form = {
        name1,
        name2,
        email,
        address1,
        address2,
        city,
        region,
        code,
        area,
        phone,
        question1,
        question2,
        series,
        question3,
        question4,
        question5,
        question6,
        question7,
        question8,
        question9,
        question10,
        message1,
        message2,
        message3,
        message4,
        message5
    };
    console.log(form);
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

    const msg = {
    // to: 'cristina@open-dreams.org',
    to: 'marcsitze01@gmail.com',
    from: 'info.opendreams@gmail.com',
    subject: "Application Form",
    html: `
        <div class="div">
        <h1>First name: ${name1}</h1>
        <h1>Second name: ${name2}</h1>
        <h1>Email: ${email}</h1>
        <h1>Address line 1: ${address1}</h1>
        <h1>Address line 2: ${address1}</h1>
        <h1>City: ${city}</h1>
        <h1>Region: ${region}</h1>
        <h1>Postal zip/code: ${code}</h1>
        <h1>Area code: ${area}</h1>
        <h1>Phone: ${phone}</h1>
        <h1>Have you ever applied to the summer academy before?: ${question1}</h1>
        <br/>
        <h1>Academic Information and Extracurricular Involvement</h1>
        <br/>
        <h1>What is your current or most recent Secondary/High School: ${question2}</h1>
        <h1>Are You in the Arts, Sciences, or Commercial Area of studies?: ${series}</h1>
        <h1>Have you already taken either both the GCE Ordinary level and Advanced Level? If yes,enter Exams taken, if no, skip the next 4 questions: ${question3}</h1>
        <h1>What Year was/were the above Exam(s) taken?</h1>
        <h1>Ordinary Level: ${question4}</h1>
        <h1>Advanced Level: ${question5}</h1>
        <h1>Enter letter grades and number of points obtained for the subjects passed</h1>
        <h1>Ordinary Level: ${question6}</h1>
        <h1>Advanced Level: ${question7}</h1>
        <h1>Did/Do you belong to any club(s) on campus? ${question8}<h1>
        <h1>Did/Do you hold any leadership role on campus?: ${question9}</h1>
        <h1>Have you ever been involved with any NGO/Community Based Organisation?: ${question10}</h1>
        <p>List up to 3 Organisation you have involved with: ${message1}</p>
        <p>List up to 5 of your most recent and significant extracurricullar involvements and awards: ${message2}</p>
        <h3 style="color: gold; font-size: 18px;"><br><br>Essay Questions<br></h3>
        <p>Tell us about Yourself and your Family: ${message3}</p>
        <p>What are your career aspirations in the long term goals?: ${message4}</p>
        <p>In few words, describe your most significant extracurricular achievements: ${message5}</p>
        </div>
    `
    };

    sgMail.send(msg).then(() => {
    console.log('Message sent');
    res.status(201).redirect('/welcome');
}).catch((error) => {
    console.log(error.response.body)
    // console.log(error.response.body.errors[0].message)
})


   
});
module.exports = router;