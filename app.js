const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const WeatherApiKey='4a8adfb667a1027e8a4d637b9f2c12d3';

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/',(req, res)=> {
    res.render('index', {weather: null, error: null});
});

app.post('/',(req,res)=>{
    let city=req.body.city;
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city},india&appid=${WeatherApiKey}`;
    console.log(url);
    
    request(url,(error,response,body)=>{
        if(error){
            res.render('index', {weather: null, error: 'Error, please try again'});
        }
        else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
              res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
              let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
              res.render('index', {weather: weatherText, error: null});
            }
          }
    })
})

app.listen(8000, function () {
    console.log('port active on 8000!');
});