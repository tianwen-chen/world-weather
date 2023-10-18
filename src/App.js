import spring from "./assets/spring.jpg"
import summer from "./assets/summer.jpg"
import fall from "./assets/fall.jpg"
import winter from "./assets/winter.jpg"

import Descriptions from "./components/Description"
import Map from "./components/Map"
import { useEffect, useState } from "react"
import { getData } from "./weatherService"


function App() {

  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric');
  const [bg, setBg] = useState(fall);
  const [coordinates, setCoordinates] = useState({ lat: 48.8534, lng: 2.3488 })   // coor of Paris

  // get data upon search

  useEffect(() => {
    const fetchWeather = async () => {
    const data = await getData(city, units);
    setWeather(data);
    
    // dynamic background display 
    const t1 = units === 'metric' ? 25: 77;
    const t2 = units === 'metric' ? 18: 64;
    const t3 = units === 'metric' ? 5: 41;
    if (data.temp >= t1){
      setBg(summer);
    } else if (data.temp >= t2) {
      setBg(spring);
    } else if (data.temp >= t3) {
      setBg(fall);
    } else {
      setBg(winter);
    };

    // set coordinates for map
    // console.log("here is fetched weather: ", { data })
    setCoordinates({ lat: data.lat, lng: data.lon })
      
    };

    fetchWeather();

    
    
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? '°F' : '°C';
    setUnits(isCelsius ? 'metric' : 'imperial');
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{backgroundImage: `url(${bg})`}}>
      <div className="overlay">
        {
          weather && (
            <div className="container">
              <div className="section section__inputs">
                <input 
                onKeyDown={enterKeyPressed}
                  type="text" 
                  name="city" 
                  placeholder="Enter City..."
                />
                <button onClick={(e) => handleUnitsClick(e)}>°F</button>
              </div>

              <div className="section section__temperature">
                <div className="icon">
                  <h3>{`${weather.name},${weather.country}`}</h3>
                  <img 
                  src={weather.iconURL}
                  alt="weatherIcon" 
                  />
                  <h3>{weather.description}</h3>
                </div>
                <div className="temperature">
                  <h1>{`${weather.temp.toFixed()} °${units === 'metric' ? "C" : "F"}`}</h1>
                </div>
              </div>

              <Descriptions weather={weather} units={units}/>

              <div className="map-container">
                <Map center={ coordinates } zoom={7} />
              </div>

            </div>
          )
        }
        
      </div>
    </div>
  );
}

export default App;
