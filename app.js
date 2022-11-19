//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
// const request = require('request');

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.use(bodyParser.json());


app.post("/", function (req, res){
    addEmailToMailchimp(req.body.email, req.body.f, req.body.l);
    console.log(req.body.email);
    if(res.statusCode === 200){
        res.sendFile(__dirname + "/success.html")
    } else {
        res.sendFile(__dirname + "/failure.html")
    }
});

app.post("/failure", function (req, res){
   res.redirect("/")
});

function addEmailToMailchimp(email, firstName, lastName){
    const request = require('request');

    const options = {
        method: 'POST',
        url: 'https://us12.api.mailchimp.com/3.0/lists/aa291d0aed/members',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic aGVsbG86YWQ4MDU0MTJhZGMzMGZjNGNkNWQ5ODMwNTBmZDUwZTctdXMxMg=='
        },
        body: {email_address: email, status: 'subscribed', FNAME: firstName,
            LNAME: lastName},
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });

}



app.listen(3000, function (){
    console.log("Server is up on 3000 port")
})