// Express v4.16.0 and higher
// --------------------------

const express = require("express");
const https = require("https");
var app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
        
});
app.post("/", function (req, res){
        
const query = req.body.cityName;
const apikey = "ddc8ab51ac2a810a87dac229902853f3";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
https.get(url, function(response){//this could have been a res
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData = JSON.parse(data);//parse assembles things
        console.log(weatherData); 
        const temp = weatherData.main.temp;
        const desc = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imgURL = "http://openweathermap.org/img/wn/" +icon+ "@2x.png";
        res.write("<p>The weather is currently dominated by "+ desc +".</p>");
        res.write("<h1>The temperature in "+query+" is: "+temp+" degrees Celsius. </h1>");
        res.write("<img src = "+imgURL+">");
        res.send();
        console.log(desc);
        console.log(temp);
      //this is just a test.
        const client1 = {
            accountId: "John",
            userId: "Ramen", 
            linkItemId: 12345
        }
        console.log(JSON.stringify(client1)); //stringify packs things down. a test until this part.
    });
});


//res.send("Server is up and running."); //we cannot call 2 sends.
});
    
/*

*/
app.listen(3000, function()
{
    console.log("Server is running on port 3000");
});
