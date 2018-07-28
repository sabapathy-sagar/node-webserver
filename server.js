const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

//ser port based on environment variable, for local development use port number 3000
const port = process.env.PORT || 3000;

//set handlebars as the view engine 
app.set('view engine', 'hbs');

//make use of partials to keep it DRY
hbs.registerPartials(__dirname + '/views/partials');

//helper method to keep it DRY
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

//middleware for logging user interactions to server.log file
app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    //collect all the logs and dump them into the server.log file
    fs.appendFile('server.log', log + '\n',(err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    })
    next();
});

// //middleware for rendering the maintenance page
//   app.use((req,res) => {
//     res.render('maintenance.hbs');
// });


//middleware for static html files
app.use(express.static(__dirname + '/public'));

//router for home page
app.get('/', (req,res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMsg: 'Welcome to my awesome site!',
    });
});

//router for about page
app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
    });
});

//router for bad page
app.get('/bad', (req,res) => {
    res.send('bad');
});

//listeneing on port 3000
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});