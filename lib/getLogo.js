const fetch = require('node-fetch');

const getLogo = async(weather) => {
    let list = ["☁️", "🌧️", "☀️", "🌫️"]
    if (weather.includes("clouds")){
        logo = list[0];
        return await logo;
    }else if (weather.includes("rain")){
        logo = list[1];
        return await logo;
    }else if (weather.includes("sun")){
        logo = list[2];
        return await logo;
    }else if (weather.includes("fog") || (weather.includes("mist"))){
        logo = list[3];
        return await logo;
    }
}

module.exports = getLogo;