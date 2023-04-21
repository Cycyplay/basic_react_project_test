import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
const WEATHER_API_KEY = "10e295f3e3f3b5cdde7ea86fc5c6d5b2";

function App() {
  const [lat, setLat] = useState(undefined);
  const [lon, setLon] = useState(undefined);

  const [temp, setTemp] = useState(undefined);
  const [ciel, setCiel] = useState(undefined);
  const [icon, setIcon] = useState(undefined);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(function (position) {
        setLat(position.coords.latitude); 
        setLon(position.coords.longitude);
      });
    } else {
      setLat(48.858370);
      setLon(2.294481); 
    }
  }, [])


  const getWeather = (lat, lon) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&lang=fr&units=metric`).then(
      function(response) {
        setCiel(response.data.weather[0].description);
        setTemp(response.data.main.temp);
        setIcon(response.data.weather[0].icon);
      }
    )
    .catch(function (error) {
      console.log(error);
    })
  }
  useEffect(() => {
    if (lat && lon){
      getWeather(lat, lon);
    }
  }, [lon, lat]);
  // le but de l'exercice est d'afficher la météo du jour en fonction des coordonées GPS récuperées au dessus.

  return (
    <div className="App">
      <header className="App-header">
      <h1>  API météo </h1>
      </header>
      {temp && ciel && icon ? (
        <div className="container">
        <img alt="Icon du temps"src={`https://openweathermap.org/img/wn/${icon}@2x.png`} height="90px" width="90px"></img>
        <p>{ciel}</p>
        <p>{temp} °C</p>
        </div>
      ) : <p> Chargment...</p> }
      
    </div>
  );
}

export default App;
