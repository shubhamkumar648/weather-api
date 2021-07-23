const express= require("express");
const bodyParser = require("body-parser")

const https = require("https");
const app = express();


app.use(bodyParser.urlencoded({extended: true}))
let port = 3000;


app.get("/",function (req,res) {                  //callback funtion routes


    res.sendFile(__dirname + "/index.html");
    // res.send("Server is up running")
})

app.post("/", function(req,res){

const query=req.body.cityName
const appid="1b35946338ca3fcda3983d4f3fec742d"
const unit="metric"
    

const url = "https://api.openweathermap.org/data/2.5/weather?q="+query +"&appid="+appid +"&units="+ unit+"";

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
        res.write("<h1>the temprarture in   "+ query + "is" + temp +" degree Celcius.<h1>");
        res.write("<img src =" +imageURL+">")
        res.send()
     })
})

    
})

app.listen(port, () => {

    console.log("sever is running on port 3000")
})