const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));


app.get('/',(req, res)=> {
    res.render('index', {weather: null, error: null});
});

app.listen(8000, function () {
    console.log('port active on 8000!');
});