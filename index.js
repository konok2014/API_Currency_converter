//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  var cr = req.body.crypto;
  var fi = req.body.fiat;
  var burl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/"
  var url = burl + cr + fi;
  request(url, function(error, response, body) {
    var data = JSON.parse(body);
    var price = data.last;
    //console.log("refresh");
    var time = data.display_timestamp;
    res.write("<p> the current time is " + time);
    res.write("<h1>Current Price " + cr + " is " + price + " " + fi + "</h1>");
    res.send();
  });
});
app.listen(3000, function() {
  console.log("running 3000");
});
