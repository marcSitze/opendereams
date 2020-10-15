const express = require('express');
const sgMail = require('@sendgrid/mail');
const router = express.Router();

// Controller
const index = require('../controllers/index');

// Render the index page
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('pages/about');
});

router.get('/about', (req, res) => {
    res.render('pages/about');  
});

// Render the scholars page
router.get('/scholars', (req, res) => {
    res.render('pages/scholars');
});

// Render services page
router.get('/services', (req, res) => {
    res.render('pages/services');
});

// router.get('/b/blog', index.blogPost);

// post a comment
// router.post('/b/blog', index.postComment);



// Get founder description
router.get('/founders/:id', (req, res) => {
    const users = [
        {
            id: '1',
            image: '/img/portfolio/002.png',
            description: `Hans is an Entrepreneur with a passion for solving tough challenges
            and complex problems. With a background in economics, data science
             and finance, he founded or co-founded several successful companies
              utilizing data to forecast the future.  Hans is passionate about
              education and artificial intelligence and believes the data has
              the potential to help humans access education, solve global
              problems and lead better lives.  With a Swedish-Filipino heritage,
               his parents instilled a strong sense of work ethic with an emphasis
                on education - the most powerful tool to shape one's future.  Hans
                co-founded Open Dreams on the belief that talent is universal, but
                 opportunity is not, driven to close that gap and build a bridge to
                 academic opportunities.  When not solving problems, Hans is devoted
                 to his family and adores his three children - Hansito, Sofia Lolita and
                 Aviva Lilia.`
        },
        {
            id: '2',
            image: '/img/portfolio/004.png',
            description: `Christina Bernardo Kulberg is the Executive Director of Emzingo|U, a leadership development and social impact B-Corp that aims to train the next generation of responsible and inclusive leaders. Born in the DC area to Cuban immigrant parents, she is the last of 10 children and has been passionate about social justice, foreign policy, and how we interact and lead across cultures from a very young age. She received her Masters at the London School of Economics in Political Economy of Development, and thereafter, went to South Africa to complete one of Emzingo|U's award-winning social impact programs working with an orphan and vulnerable children center in Soweto. Joining the social enterprise shortly thereafter, she has helped to grow partnerships and expand the organization's mission and reach for the last 7 years. She also had the honor and privilege of working for the Obama Administration focusing on rural and tribal economic development at the U.S. Department of Agriculture - Rural Development. With a strong passion for education and access to opportunity, she founded Open Dreams with her dear friend Blaise Buma and her husband Hans Kullberg, to help over 70 high achieving, low income students in Cameroon receive full scholarships to leading universities across the world. (may not need last line!)`
        },
        {
            id: '3',
            image: '/img/team/team-4.jpeg',
            description: `Blaise Buma (I don’t have his picture so you can leave it for now but include the bio)
            Not long ago, our co-founder Blaise Buma, was one of many kids in his hometown in Cameroon struggling
            to make ends meet. As bright he was, he didn't know which path to take to turn his dreams into reality.
             Luckily for him, a bright young girl named Morgan saw something in him that he hadn't yet recognized in
             himself - his full potential.

            Morgan knew withe the right training and support Blaise would succeed at any top university in the world.
             She was right. Two years after their encounter Blaise had earned a full scholarship to Washington & Lee College in Virginia.
              He then went on to study at the London School of Economics in England, to become a Schwarzman Scholar in China,
               and to be accepted to Harvard Business School. That little extra push from a person that cared is what got him here today
               . Now it is his turn to give back.`
        }
    ];

    res.render('pages/founder', {
        users: users,
        num: req.params.id
    });
});


router.post('/', async (req, res) => {
    console.log(req.body);
    let contact;
       const { name, email, phone, subject, message } = req.body;
       contact = {
           name,
           email,
           phone,
           subject,
           message
       };

   console.log(contact);



   sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
const msg = {
  to: 'cristina@open-dreams.org',
  from: 'info.opendreams@gmail.com',
  subject: contact.subject,
  text: contact.message
};

       try {
        //    const newcontact = await contact.save();
        sgMail.send(msg);
         console.log(contact);
           res.status(201).redirect('/welcome');

       } catch(err) {
        console.error(err);
        if(err.response) {
            console.error(err.response.body);
        }
           res.status(400).send(err);

       }
   });

module.exports = router;
