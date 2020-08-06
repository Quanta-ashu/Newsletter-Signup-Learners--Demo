const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const https = require("https");
const { response } = require("express");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signUp.html");
});


app.post("/", function (req, res) {
  const fname = req.body.firstname;
  const lname = req.body.lastname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscibed",

        merge_fields: {
          FNAME: fname,
          LNAME: lname,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us17.api.mailchimp.com/3.0/lists/31bf204f22";

  const options = {
    method: "POST",
    auth: "gangwarashutosh999:f06c8b13bfe7280ec621f51f556b5050-us17 ",
  };

  // var rescode = 200;

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
      const rescode = response.statusCode ;

       if(rescode === 200)
       res.sendFile(__dirname + "/success.html");

       else
       res.sendFile(__dirname + "/failure.html");


    });
  });

  request.write(jsonData);
  request.end();

  // if (rescode == 200) console.log("success");
});

app.post("/failure" , function(req,res)
{
    res.redirect("/");

});



app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on Port 3000");
});

// api Key
// 5891eb0903c7dfa24ae7d5eb4059609e-us17

// ID
// 31bf204f22
//31bf204f22
