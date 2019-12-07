const input = document.querySelector('input');
const search = document.querySelector('.fa-search');
const cityName = document.querySelector('.city');
const day1 = document.querySelector('.day1');
const day2 = document.querySelector('.day2');
const day3 = document.querySelector('.day3');
const day4 = document.querySelector('.day4');
const day5 = document.querySelector('.day5');

const iconToday = document.querySelector('.today-icon');
var icons = document.querySelectorAll('.icon');

const header = document.querySelector('header')
const today = document.querySelector('.today');
const todayTime = document.querySelector('.todayTime');
const nextDays = document.querySelector('.next-days');
const form = document.querySelector('form');

const weatherDay3 = document.querySelector('.weatherDay3');
const weatherDay4 = document.querySelector('.weatherDay4');
const weatherDay5 = document.querySelector('.weatherDay5');

const dateTomorrow = document.querySelector('.dateTomorrow');
const dateDay3 = document.querySelector('.dateDay3');
const dateDay4 = document.querySelector('.dateDay4');
const dateDay5 = document.querySelector('.dateDay5');

const pressure = document.querySelector('.pressure');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');



function setDayName(date) {
    var allDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date(date); // to get the DateTime. 
    var dayName = allDays[d.getDay()];
    // console.log(dayName + " oto jaki to dzien");
    return dayName;
}

function setDate(date) {
    newDate = date.slice(-2) + "." + date.slice(-5, -3);
    return newDate;
}


function setIcon(weather, dayNumber) {

    var weatherIcon;

    if (weather == "Clear") {
        weatherIcon = 'http://openweathermap.org/img/wn/01d@2x.png';
    }

    if (weather == "Thunderstorm") {

        weatherIcon = 'http://openweathermap.org/img/wn/11d@2x.png';
    }
    if (weather == "Drizzle") {

        weatherIcon = 'http://openweathermap.org/img/wn/09d@2x.png';
    }
    if (weather == "Rain") {

        weatherIcon = 'http://openweathermap.org/img/wn/10d@2x.png';
    }
    if (weather == "Snow") {

        weatherIcon = 'http://openweathermap.org/img/wn/13d@2x.png';
    }

    if (weather == "Atmosphere") {

        weatherIcon = 'http://openweathermap.org/img/wn/50d@2x.png';
    }
    if (weather == "Clear") {
        weatherIcon = 'http://openweathermap.org/img/wn/01d@2x.png';
    }
    if (weather == "Clouds") {
        weatherIcon = 'http://openweathermap.org/img/wn/02d@2x.png';
    }

    return weatherIcon;
}


function app() {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + input.value + '&APPID=7063b5a6b3ec56b1b07066a804142d51')


        .then(response => response.json())
        .then(data => {
            console.log(data);
            cityName.innerHTML = data.city.name;
            var nowTime = new Date();
            // todayTime.innerHTML = data.list[0].dt_txt.slice(-8, -3);
            todayTime.innerHTML = nowTime.getHours() + ":" + nowTime.getMinutes();

            //day 1
            day1.innerHTML = Math.round((data.list[0].main.temp - 273).toFixed(2));
            pressure.innerHTML = data.list[0].main.pressure;
            humidity.innerHTML = data.list[0].main.humidity;
            wind.innerHTML = data.list[0].wind.speed;
            var weatherIcon = setIcon(data.list[0].weather[0].main, 0);
            iconToday.src = weatherIcon;


            //next days
            day2.innerHTML = Math.round((data.list[8].main.temp - 273).toFixed(2));
            var weatherIcon = setIcon(data.list[8].weather[0].main, 0);
            icons[0].src = weatherIcon;
            day3.innerHTML = Math.round((data.list[16].main.temp - 273).toFixed(2));
            var weatherIcon = setIcon(data.list[16].weather[0].main, 0);
            icons[1].src = weatherIcon;
            day4.innerHTML = Math.round((data.list[24].main.temp - 273).toFixed(2));
            var weatherIcon = setIcon(data.list[24].weather[0].main, 0);
            icons[2].src = weatherIcon;
            day5.innerHTML = Math.round((data.list[32].main.temp - 273).toFixed(2));
            var weatherIcon = setIcon(data.list[32].weather[0].main, 0);
            icons[3].src = weatherIcon;

            //put date
            // weatherDay4.innerHTML = (data.list[24].dt_txt).slice(0, -9);
            // weatherDay5.innerHTML = (data.list[32].dt_txt).slice(0, -9);
            dateTomorrow.innerHTML = setDate((data.list[8].dt_txt).slice(0, -9));
            weatherDay3.innerHTML = setDayName((data.list[16].dt_txt).slice(0, -9));
            dateDay3.innerHTML = setDate((data.list[16].dt_txt).slice(0, -9));
            weatherDay4.innerHTML = setDayName((data.list[24].dt_txt).slice(0, -9));
            dateDay4.innerHTML = setDate((data.list[24].dt_txt).slice(0, -9));
            weatherDay5.innerHTML = setDayName((data.list[32].dt_txt).slice(0, -9));
            dateDay5.innerHTML = setDate((data.list[32].dt_txt).slice(0, -9));

            today.style.transform = "translateX(-50%)";
            nextDays.style.opacity = "1";
            form.style.top = "5%";
            header.style.height = "80vh";

        })
}

search.addEventListener('click', app);

input.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        app();
    }
});