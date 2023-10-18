
const KEY = process.env.REACT_APP_WEATHER_API_KEY;
const makeIconURL = (iconId) => `http://openweathermap.org/img/wn/${iconId}@2x.png`;

const getData = async (city, units = 'metric') => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}&units=${units}`;

    const data = await fetch(URL)
    .then((res) => res.json())
    .then((data => data));

    // format data
    const {weather, 
        coord : {lon, lat},
        main: {temp, feels_like, temp_min, temp_max, pressure, humidity},
        wind: {speed},
        sys: {country},
        name,
    } = data;

    const { description, icon } = weather[0];

    return {
        description, 
        iconURL: makeIconURL(icon), 
        lon,
        lat,
        temp, 
        feels_like, 
        temp_min, 
        temp_max, 
        pressure, 
        humidity, 
        speed, 
        country, 
        name,
    }
}

export {getData};