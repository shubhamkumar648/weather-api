const express= require("express");

const https = require("https");

const app = express();

let port = 3000;

const url = "https://api.openweathermap.org/data/2.5/weather?q=london&appid=1b35946338ca3fcda3983d4f3fec742d&units=metric";

app.get(  '/', function (req,res) {                  //callback funtion routes


https.get(url, function(response) {

    console.log(response.statusCode)

     response.on("data", function(data){

        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const weatherDescription = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
    //    const imageURL =   "http://openweathermap.org/img/wn/" + icon + "10d@2x.png";
        res.write("<p>the weather is currently weather description "+ weatherDescription +" </p>");
        res.write("<h1>the temprarture in London is" + temp +" degree Celcius.<h1>");
        res.write("<img src =" +imageURL+">")
        res.send()
     })
})

    // res.send("Server is up running")
})


app.listen(port, () => {

    console.log("sever is running on port 3000")
})