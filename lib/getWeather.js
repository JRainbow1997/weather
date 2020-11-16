const fetch = require('node-fetch');
require('dotenv').config();

const getWeather = async(cities, code) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cities},${code}&units=metric&appid=${process.env.APPID}`
    data = await fetch(url);
    return await data.json();
}

module.exports = getWeather;