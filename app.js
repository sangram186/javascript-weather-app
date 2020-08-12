// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
// 412a19a0b97caa8789a1bec972206897

 const weatherApi = {
     key: '412a19a0b97caa8789a1bec972206897',
     baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
 }

 // Event listener Function on keypress
 const searchInputBox = document.getElementById('input-box');
 searchInputBox.addEventListener('keypress', event => {
    if(event.keyCode === 13){
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = 'block';
    }
 })

 // Get Weather Report
function getWeatherReport(city){
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json()
    }).then(showWeatherReport)
}
 // Show Weather Report
function showWeatherReport(weather){
    
    console.log(weather);
    // get city
    const city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    // get date
    const date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    const temp = document.getElementById('temp');
    temp.innerText = `${Math.round(weather.main.temp)}°C`;

    const minMax = document.getElementById('min-max');
    minMax.innerText = `${Math.floor(weather.main.temp_min)}°C (min) / ${Math.ceil(weather.main.temp_max)}°C (max)`

    const weatherStatus = document.getElementById('weather');
    weatherStatus.innerText = `${weather.weather[0].main}`;

    if(weatherStatus.innerText === 'Clouds'){
        document.body.style.backgroundImage = 'url(images/cloudy.png';
    }
    else if(weatherStatus.innerText === 'Clear'){
        document.body.style.backgroundImage = 'url(images/clear.png';
    }
    else if(weatherStatus.innerText === 'Drizzle' || 'Mist' || 'Rainy'){
        document.body.style.backgroundImage = 'url(images/rainy.png';
    }
    else if(weatherStatus.innerText === 'Sunny'){
        document.body.style.backgroundImage = 'url(images/sunny.png';
    }

}

 // Data manage
function dateManage(dateArg) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}