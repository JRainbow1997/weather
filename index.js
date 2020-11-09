const express = require('express'); //express links
const hbs = require('express-handlebars'); //handlebar links
const path = require('path');
const getWeather = require('./lib/getWeather'); //link to lib/getWeather
const bodyParser = require('body-parser');
const app = express(); //delaring this as an express page

//app.use
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('views/images'));

//app.engine
app.engine('hbs', hbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials')
}));

//app.set
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

//app.get
app.get('/', async(req, res) => {
    let cities = ["Manchester", "Birmingham", "Bristol", "London", "Sunderland", "Cardiff", "Edinburgh", "Belfast"];
    name = []; description = []; temp = []; feels_like = [];
    for (i = 0; i < cities.length; i++){
        let data = await getWeather(cities[i],"uk");
        console.log(data);
        name[i] = data.name;
        description[i] = data.weather[0].description;
        temp[i] = data.main.temp;
        feels_like[i] = data.main.feels_like;
    }
    res.render('index', {
        name,
        data: {description, temp, feels_like}
    });
});
app.get('/weather', (req,res) => {
    res.render('weather');
});
app.get('/northwest', (req,res) => {
    res.render('northwest');
});
app.get('/northeast', (req,res) => {
    res.render('northeast');
});
app.get('/midlands', (req,res) => {
    res.render('midlands');
});
app.get('/southwest', (req,res) => {
    res.render('southwest');
});
app.get('/southeast', (req,res) => {
    res.render('southeast');
});
app.get('/wales', (req,res) => {
    res.render('wales');
});
app.get('/scotland', (req,res) => {
    res.render('scotland');
});
app.get('/northernireland', (req,res) => {
    res.render('northernireland');
});
app.get('*', (req,res) => {
    res.render('404');
});

//app.post
app.post('/weather', async (req,res) => {
    let city = req.body.city;
    let code = req.body.code;
    let data = await getWeather(city, code);
    if (data.cod == '404'){
        res.render('weather', {
            err:'The provided location doesn\'t exist'
        });
        return;
    }
    let name = data.name;
    let temp = data.main.temp;
    let description = data.weather[0].description;
    let feels_like = data.main.feels_like;
    res.render('weather', {
        name,
        data: {description, temp, feels_like},
        listExists: true
    });
});

//app.listen
app.listen(3001, () => {
    console.log('listening on port 3001');
});