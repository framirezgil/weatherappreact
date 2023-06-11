import { useState, useEffect } from "react";
import WeatherForm from "./WeatherForm.js";
import WeatherMainInfo from "./WeatherMainInfo.js";

import styles from './weatherApp.module.css';
import Loadinng from "./loading.js";



export default function WeatherApp() {
  const [ weather, setWeather ] = useState(null);
  
  useEffect(() => {
    loadInfo();
  }, []);

  useEffect(() => {
    document.title = `Weather | ${weather?.location.name}`;
  }, [weather])

  async function loadInfo(city = 'Santo Domingo') {

    try {
      const request = await fetch(`${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`);

      const json = await request.json();

      setTimeout(() => {
      setWeather(json);
      }, 2000);

      console.log(json);

    } catch (error) {
        
    }

}

function handleChangeCity(city) {
    setWeather(null);
    loadInfo(city);

}

return (
    <div className={styles.weatherContainer}>
      <div className={styles.titleTop}>Search Weather</div>
      <WeatherForm onChangeCity={handleChangeCity} />
      {weather ? <WeatherMainInfo weather={weather}/> : <Loadinng /> }
    </div>

);
}


