const express = require('express');
var app = express();

const hbs = require('hbs'); //Handle Bars code
const fs = require('fs');

// const port = process.env.port || 3000;
const port = '0.0.0.0';

app.set('view engine','hbs');

app.use((req,res,next)=> {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log (log);
    fs.appendFile('server.log',log +'\n',err=>{
        console.log('Unable to append File');   
    })
    next();
})

// app.use((req,res) => {
//     res.render('maintenance.hbs',{
//         pageTitle:'Down For Maintenance',
//         currentYear: new Date().getFullYear()
//     })
// })


app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=> {
    // res.send('Hello Express');
    res.render('welcome.hbs',{
        pageTitle: 'Welcome Page',
        welcomeMsg: 'Welcome Sunil',
        currentYear:new Date().getFullYear()
    })
});

app.get('/about',(req,res)=> {
    res.render('about.hbs',{
        pageTitle: 'Sunils Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad',(req,res)=> {
    res.send({
        error: 'Error Message',
        errdetails:[
            'Error due to socket connection',
            'Bad parameter'
        ]
    })
})
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});


