const https = require('https');
const key = '638bf7afcacc005ed5c2204b585fea3e';

function printMessage(city, weather, descrition, lowTemp, highTemp) {
     let message = `The weather in ${city} is ${descrition}, The current temperature is ${weather} degrees celsius there will be a low of ${lowTemp} and a high of ${highTemp}`;
    console.log('\x1b[36m%s\x1b[0m', message);
}
function getWeather(city) {    
    const request = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${key}`, response => {
        if (response.statusCode === 200) {
                let responseCode = response.statusCode;
                console.log(`Contgratulations you are sucessfully connected to the API with status code of : \x1b[33m ${responseCode}`);
                let body = '';
                response.on('data', data => {
                    body += data.toString();
                });
                response.on('end', () => {
                    const weatherData = JSON.parse(body); 
                    printMessage(city, weatherData.main.temp, weatherData.weather[0].description, weatherData.main.temp_min, weatherData.main.temp_max);
                    
                    
                
                });
    }else {
        let errorMessage = `There was a error getting the weather for ${city} with an error code of : ${response.statusCode}`;
        console.error(errorMessage);
        
    }

    });
}

// lets you pull vars from the users in the console
const citys = process.argv.slice(2);

// const citys = [
//     'london',
//     'paris',
//     'berlin',
//     'dublin',
//     'warsaw',
//     'new york'
// ];
// loops over the function with 
citys.forEach(citys => {
    getWeather(citys);
});


// issues 
// wasnt able to access the weather descrition data 
//weatherData.weather.
//catching errors
// try {

// }catch (error) {
//     console.error(error.message)
// }
